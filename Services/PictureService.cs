﻿using AutoMapper;
using Google.Apis.Util;
using Google.Cloud.Vision.V1;
using Microsoft.AspNetCore.Authorization;
using Org.BouncyCastle.Asn1.X509.Qualified;
using PicturesAPI.Authorization;
using PicturesAPI.Entities;
using PicturesAPI.Enums;
using PicturesAPI.Exceptions;
using PicturesAPI.Models;
using PicturesAPI.Models.Dtos;
using PicturesAPI.Models.Interfaces;
using PicturesAPI.Repos.Interfaces;
using PicturesAPI.Services.Helpers;
using PicturesAPI.Services.Interfaces;
// ReSharper disable TemplateIsNotCompileTimeConstantProblem

namespace PicturesAPI.Services;

public class PictureService : IPictureService
{
    private readonly ILogger<PictureService> _logger;
    private readonly IMapper _mapper;
    private readonly IAuthorizationService _authorizationService;
    private readonly IAccountContextService _accountContextService;
    private readonly IPictureRepo _pictureRepo;
    private readonly IAccountRepo _accountRepo;
    private readonly ILikeRepo _likeRepo;
    private readonly ITagRepo _tagRepo;

    public PictureService(
        ILogger<PictureService> logger, 
        IAuthorizationService authorizationService, 
        IAccountContextService accountContextService,
        IPictureRepo pictureRepo,
        IAccountRepo accountRepo,
        ILikeRepo likeRepo,
        ITagRepo tagRepo,
        IMapper mapper)
    {
        _logger = logger;
        _mapper = mapper;
        _authorizationService = authorizationService;
        _accountContextService = accountContextService;
        _pictureRepo = pictureRepo;
        _accountRepo = accountRepo;
        _likeRepo = likeRepo;
        _tagRepo = tagRepo;
    }
    
    public  PagedResult<PictureDto> GetAll(PictureQuery query)
    {
        IEnumerable<Picture> baseQuery;
        IEnumerable<Picture> sortedQuery;

        if (_accountContextService.TryGetAccountId() is not null)
        {
            var accId = _accountContextService.GetAccountId();
            baseQuery = _pictureRepo.GetNotSeenByAccountId(accId);
            sortedQuery = PictureSorter
                .SortPics(baseQuery, _tagRepo.GetTagsByAccountId(accId))
                .Skip(query.PageSize * (query.PageNumber - 1))
                .Take(query.PageSize);
        }
        else
        {
            baseQuery = _pictureRepo.GetAll();
            sortedQuery = PictureSorter
                .SortPics(baseQuery)
                .Skip(query.PageSize * (query.PageNumber - 1))
                .Take(query.PageSize);
        }

        if (!sortedQuery.Any()) throw new NotFoundException("pictures not found");
        
        var resultCount = baseQuery.ToList().Count;
        var pictureDtos = _mapper.Map<List<PictureDto>>(sortedQuery).ToList();
        AllowModifyItems(pictureDtos);
        var result = new PagedResult<PictureDto>(pictureDtos, resultCount, query.PageSize, query.PageNumber);
        return result;
    }

    // refactor this whole method
    public  PagedResult<PictureDto> SearchAll(SearchQuery query)
    {
        var baseQuery = _pictureRepo.GetAll();

        List<Picture> sortedQuery;

        switch (query.SearchBy)
        {
            case SortSearchBy.MostPopular:
                sortedQuery = PictureSorter.SortPics(baseQuery).ToList();
                break;
            case SortSearchBy.Newest:
                sortedQuery = baseQuery
                    .OrderByDescending(p => p.PictureAdded)
                    .ToList();
                break;
            case SortSearchBy.MostLikes:
                sortedQuery = baseQuery
                    .OrderByDescending(p => p.Likes.Count(l => l.IsLike))
                    .ToList();
                break;
            default:
                throw new BadRequestException("Invalid 'search by' option");
        }

        var pictures = sortedQuery
            .Where(p => query.SearchPhrase == null ||
                        p.Name.ToLower().Contains(query.SearchPhrase.ToLower()))
                        // p.Tags.ToLower().Contains(query.SearchPhrase.ToLower()))
            .Select( picture => _pictureRepo.GetById(picture.Id))
            .ToList();

        if (pictures.Count == 0) throw new NotFoundException("pictures not found");
        
        var resultCount = pictures.Count;
        var pictureDtos = _mapper
            .Map<List<PictureDto>>(pictures)
            .Skip(query.PageSize * (query.PageNumber - 1))
            .Take(query.PageSize)
            .ToList();
        AllowModifyItems(pictureDtos);
        var result = new PagedResult<PictureDto>(pictureDtos, resultCount, query.PageSize, query.PageNumber);
        return result;
    }

    public  List<LikeDto> GetPicLikes(int id)
    {
        if (_pictureRepo.GetById(id) is null) throw new NotFoundException("picture not found");
        var likes = _likeRepo.GetByLikedId(id);
        var likeDtos = _mapper.Map<List<LikeDto>>(likes);

        return likeDtos;
    }
    
    public  List<AccountDto> GetPicLikers(int id)
    {
        if (_pictureRepo.GetById(id) is null) throw new NotFoundException("picture not found");
        var likes = _likeRepo.GetByLikedId(id);
        var accounts = likes.Select(like => like.Liker).ToList();
        var result = _mapper.Map<List<AccountDto>>(accounts);
        return result;
    }
    
    public PictureDto GetById(int id)
    {
        var picture = _pictureRepo.GetById(id);
        if (picture == null) throw new NotFoundException("picture not found");
        var result = _mapper.Map<PictureDto>(picture);
        return result;
    }
    
    public int Create(IFormFile file, CreatePictureDto dto)
    {
        var id = _accountContextService.GetAccountId();
        var account = _accountRepo.GetById(id);

        var picture = _mapper.Map<Picture>(dto);

        picture.Account = account;

        if (file is not { Length: > 0 }) throw new BadRequestException("invalid picture");
        
        var rootPath = Directory.GetCurrentDirectory();

        var randomName = $"{Path.GetRandomFileName().Replace('.', '-')}.webp";
        var fullPath = Path.Combine(rootPath, "wwwroot", "pictures", $"{randomName}");
        picture.Url = Path.Combine("wwwroot", "pictures", $"{randomName}");
        
        using (var stream = new FileStream(fullPath, FileMode.Create, FileAccess.ReadWrite, FileShare.ReadWrite))
        {
            file.CopyTo(stream);
            stream.Dispose();
        }
        _pictureRepo.Insert(picture);

        if (dto.Tags is not null)
        {
            foreach (var tag in dto.Tags.Distinct())
            {
                _tagRepo.InsertAndSave(new Tag()
                {
                    Value = tag,
                });
                _tagRepo.TryInsertPictureTagJoin(picture, _tagRepo.GetByValue(tag));
            }
        }

        _pictureRepo.Save();
        return picture.Id;

    }

    public SafeSearchAnnotation Classify(IFormFile file)
    {
        if (file is null) throw new BadRequestException("Invalid file");
        using var ms = new MemoryStream();
        file.CopyTo(ms);
        var fileBytes = ms.ToArray();
        return NsfwClassifier.ClassifyAsync(fileBytes).Result;
    }

    public PictureDto Update(int id, PutPictureDto dto)
    {
        var picture = _pictureRepo.GetById(id);
        if (picture is null) throw new NotFoundException("picture not found");
        
        AuthorizePictureOperation(picture, ResourceOperation.Update,"you cant modify picture you didnt added");

        if (dto.Description is not null)
        {
            picture.Description = dto.Description;
        }
        if (dto.Name is not null)
        {
            picture.Name = dto.Name;
        }
        // if (dto.Tags is not null)
        // {
        //     picture.Tags = dto.Tags.ToString();
        // }
        _pictureRepo.Update(picture);
        _pictureRepo.Save();
        var result = _mapper.Map<PictureDto>(picture);
        return result;
    }
        
    public void Delete(int id)
    {
        var picture = _pictureRepo.GetById(id);
        if (picture is null) throw new NotFoundException("picture not found");
        _logger.LogWarning($"Picture with id: {id} DELETE action invoked");

        AuthorizePictureOperation(picture, ResourceOperation.Delete ,"you have no rights to delete this picture");

        _pictureRepo.DeleteById(picture.Id);
        var fullPath = Path.Combine(Directory.GetCurrentDirectory(), picture.Url);
        File.Delete(fullPath);
        _pictureRepo.Save();
        _logger.LogWarning($"Picture with id: {id} DELETE action success");
    }


    private void AllowModifyItems(List<PictureDto> items)
    {
        var accountRole = _accountContextService.GetAccountRole();
        var accountId = _accountContextService.GetEncodedAccountId();
        foreach (var item in items)
        {
            if (item.AccountId == accountId)
            {
                item.IsModifiable = true;
            }
            else if (accountRole == 3)
            {
                item.IsAdminModifiable = true;
            }
            foreach (var comment in item.Comments)
            {
                if (comment.AccountId == accountId)
                {
                    comment.IsModifiable = true;
                }
                else if (accountRole == 3)
                {
                    item.IsAdminModifiable = true;
                }
            }
        }
    }

    private void AuthorizePictureOperation(Picture picture, ResourceOperation operation, string message)
    {
        var user = _accountContextService.User;
        var authorizationResult = _authorizationService.AuthorizeAsync(user, picture, new PictureOperationRequirement(operation)).Result;
        if (!authorizationResult.Succeeded) throw new ForbidException(message);
    }
    
}