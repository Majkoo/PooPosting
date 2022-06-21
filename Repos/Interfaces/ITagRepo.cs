﻿using PicturesAPI.Entities;

namespace PicturesAPI.Repos.Interfaces;

public interface ITagRepo
{
    List<Tag> GetAll();
    List<Tag> GetByPhrase(string phrase);
    Tag GetByValue(string value);
    Tag InsertAndSave(Tag tag);
    void TryInsertPictureTagJoin(Picture picture, Tag tag);
    void TryInsertAccountLikedTag(Account account, Tag tag);
    void TryDeleteAccountLikedTag(Account account, Tag tag);
    void Delete(Tag tag);
    void Update(Tag tag);
    List<Tag> GetTagsByPictureId(int pictureId);
    List<Tag> GetTagsByAccountId(int accountId);
    void Save();
}
