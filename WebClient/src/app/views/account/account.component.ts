import {Component, HostListener, inject, OnInit} from '@angular/core';
import {CommonModule } from '@angular/common';
import {catchError, combineLatest, EMPTY, filter, map, Observable, of, Subscription, switchMap, tap} from "rxjs";
import {AccountDto} from "../../shared/utility/dtos/AccountDto";
import {UrlTransformModule} from "../../shared/utility/pipes/url-transform/url-transform.module";
import {fadeInAnimation} from "../../shared/utility/animations/fadeInAnimation";
import {AuthService} from "../../services/api/account/auth.service";
import * as _ from "lodash";
import { PictureDto } from 'src/app/shared/utility/dtos/PictureDto';
import { AccountPictureTrackingService } from '../home/account-picture-tracking.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountService } from 'src/app/services/api/account/account.service';
import { ToastrService } from 'ngx-toastr';
import { defaultErrorHeading } from 'src/app/shared/utility/constants';
import { PostPreviewComponent } from "./post-preview/post-preview.component";
import { AccountSkeletonComponent } from "./skeleton/account-skeleton.component";
import { ChangeUsernameComponent } from "./change-username/change-username.component";

@Component({
  selector: 'pp-account',
  standalone: true,
  imports: [CommonModule, UrlTransformModule, PostPreviewComponent, AccountSkeletonComponent, ChangeUsernameComponent],
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss'],
  animations: [fadeInAnimation]
})
export class AccountComponent implements OnInit{

  private route = inject(ActivatedRoute);
  private toastrService = inject(ToastrService);
  private router = inject(Router);
  private accountService = inject(AccountService);
  private pictureTrackService = inject(AccountPictureTrackingService)
  private authService = inject(AuthService);
  private masterSub: Subscription = new Subscription();

  account$: Observable<AccountDto> = new Observable<AccountDto>();
  isAccountCurrentUsers = false;
  pictures : PictureDto[] = [];
  isPictueModalOpen = false;
  likesCount = 0
  commentsCount = 0
  currentId: string = ""

  pictures$ = this.pictureTrackService.pictures$;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const threshold = windowHeight * 0.75;

    const isAtBottomOfTheScreen = documentHeight - scrollPosition - windowHeight < threshold;
    if (isAtBottomOfTheScreen && this.pictureTrackService.canFetchPictures) {
      
      this.pictureTrackService.canFetchPictures = false;
      this.pictureTrackService.triggerCall.next(null);
    }
  }

  trackByPictureId(index: number, picture: PictureDto): string {
    return picture.id;
  }

  logout() {
    this.authService.forgetTokens().subscribe();
  }

  ngOnDestroy() {
    this.masterSub.unsubscribe();
  }

  async ngOnInit() {
    const id$: Observable<string> = this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (!id) {
          this.router.navigateByUrl('..');
          return EMPTY;
        }
        return of(id);
      })
    );

    const initialAccount$ = id$.pipe(
      switchMap(id => this.getAccount(id)),
    );

    id$.pipe(tap(id=>{
      this.pictureTrackService.resetPictures()
      this.pictureTrackService.accountPageId = id
      this.pictureTrackService.triggerCall.next(null);
    })).subscribe()

    this.account$ = combineLatest([initialAccount$]).pipe(
      map(([account]) => {
        if (account) {
          const acc = account as AccountDto;
          if(this.currentId == ""){
            this.currentId = acc.id
          }
          if(this.currentId != acc.id){
            this.pictures = []
            this.currentId = acc.id
          }
          this.isAccountCurrentUsers = acc.id == this.authService.getJwtData()?.uid;
          this.likesCount = acc.likeCount
          this.commentsCount = acc.commentCount
          return acc;
        }
        return null;
      }),
      filter((account): account is AccountDto => account !== null)
    );
  }
  private getAccount(id: string) {
    return this.accountService.getById(id).pipe(
      catchError(async (err) => {
        await this.router.navigate(['..']);
        this.toastrService.error(err.error, defaultErrorHeading);
        return of(null);
      }))
  }

}
