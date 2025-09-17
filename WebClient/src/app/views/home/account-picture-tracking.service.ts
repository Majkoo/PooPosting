import {ChangeDetectorRef, inject, Injectable} from '@angular/core';
import {BehaviorSubject, combineLatest, shareReplay, startWith, Subject, switchMap} from "rxjs";
import {filter, map, tap} from "rxjs/operators";
import {PictureService} from "../../services/api/picture/picture.service";
import {PictureLikesService} from "../../services/api/picture/picture-likes.service";
import {CommentService} from "../../services/api/comment/comment.service";
import {PagedResult} from "../../shared/utility/dtos/PagedResult";
import {PictureDto} from "../../shared/utility/dtos/PictureDto";
import { NavigationEnd, NavigationStart, Router } from '@angular/router';
import { AccountService } from 'src/app/services/api/account/account.service';

@Injectable({
  providedIn: 'root'
})
export class AccountPictureTrackingService {
  public triggerCall = new BehaviorSubject<null>(null);
  public canFetchPictures = true;
  public accountPageId;

  private pageSize = 4;
  private pageNumber = 1;

  private pictureService = inject(PictureService);
  private accountService = inject(AccountService);
  private pictureLikesService = inject(PictureLikesService);
  private commentService = inject(CommentService)

  private picturesAggregated: PictureDto[] = [];
  private pictureUpdate$ = new Subject<PictureDto>();


  accountPageScroll$ = this.triggerCall
    .pipe(
      switchMap(() => this.getPictures(this.pageSize, this.pageNumber, this.accountPageId))
    );
  likedPicture$ = this.pictureLikesService.likedPicture$
    .pipe(
      startWith(null)
    );
  updatedPicture$ = this.pictureService.updatedPicture$
    .pipe(
      startWith(null)
    );
  commentAdded$ = this.commentService.addedComment$
    .pipe(
      startWith(null)
    );

  pictures$ = combineLatest([
    this.accountPageScroll$,
    this.likedPicture$,
    this.updatedPicture$,
    this.commentAdded$,
    this.pictureUpdate$.pipe(startWith(null))
  ]).pipe(
    shareReplay(),
    map(([
           pictures,
           likedPicture,
           updatedPicture,
           commentAdded,
           pictureUpdate
         ]) => {
      return pictures.map((picture) => {
        if (pictureUpdate && picture.id === pictureUpdate.id) {
          return { ...picture, ...pictureUpdate };
        }
        if (likedPicture && picture.id === likedPicture.id) {
          return {
            ...picture,
            isLiked: likedPicture.isLiked,
            likeCount: likedPicture.likeCount
          };
        }
        if (updatedPicture && picture.id === updatedPicture.id) {
          return { ...updatedPicture };
        }
        if (commentAdded && picture.id === commentAdded.pictureId) {
          return { ...picture, comments: [commentAdded, ...picture.comments] };
        }
        return picture;
      });
    })
  );

  private getPictures = (pageSize: number, pageNumber: number, accountId: string) => {
    return this.accountService.getPicturesById(accountId, pageSize, pageNumber).pipe(
      map((res: PagedResult<PictureDto>) => {
        this.pageNumber = res.page === res.totalPages ? 1 : res.page + 1;
        this.picturesAggregated = [...this.picturesAggregated, ...res.items];
        this.canFetchPictures = true;
        if(res.page == res.totalPages){
          this.canFetchPictures = false
        }
        return this.picturesAggregated;
      }),
    );
  };

  // activates after user closes picture modal and gets pic id from url
  constructor(private router: Router) {
    this.router.events
      .pipe(
        filter((event): event is NavigationStart => event instanceof NavigationStart)
      )
      .subscribe(() => {
        if (router.url.includes("?picture=")) {
          const pictureId = router.url.split("=")[router.url.split("=").length-1]
          this.updatePicture(pictureId)
        }
      });
  }

  // updates picture
  private updatePicture = (id: string) => {
    this.pictureService.getById(id)
      .pipe(
        tap((pic : PictureDto) => {
          this.pictureUpdate$.next({
            ...pic,
          });
        })
      ).subscribe()
  }

  public resetPictures(){
    this.picturesAggregated = []
  }
}
