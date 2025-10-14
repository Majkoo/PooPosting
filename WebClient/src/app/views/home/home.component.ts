import {Component, HostListener, inject} from '@angular/core';
import { PictureDto } from '../../shared/utility/dtos/PictureDto';
import {PostCardComponent} from "./post-card/post-card.component";
import { AsyncPipe } from "@angular/common";
import {CreateAccountBannerComponent} from "./create-account-banner/create-account-banner.component";
import {fadeInAnimation} from "../../shared/utility/animations/fadeInAnimation";
import {AuthService} from "../../services/api/account/auth.service";
import {HomePictureTrackingService} from "./home-picture-tracking.service";
import { PostCardSkeletonComponent } from "./post-card/skeleton/post-card-skeleton.component";

@Component({
    selector: 'pp-home',
    templateUrl: 'home.component.html',
    standalone: true,
    imports: [
    PostCardComponent,
    AsyncPipe,
    CreateAccountBannerComponent,
    PostCardSkeletonComponent
],
    animations: [fadeInAnimation]
})
export class HomeComponent {
  private authService = inject(AuthService)
  private homeService = inject(HomePictureTrackingService)

  pictures$ = this.homeService.pictures$;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const scrollPosition = window.scrollY || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const threshold = windowHeight * 0.75;

    const isAtBottomOfTheScreen = documentHeight - scrollPosition - windowHeight < threshold;
    if (isAtBottomOfTheScreen && this.homeService.canFetchPictures) {
      this.homeService.canFetchPictures = false;
      this.homeService.triggerCall.next(null);
    }
  }

  trackByPictureId(index: number, picture: PictureDto): string {
    return picture.id;
  }

  get isLoggedIn() {
    return this.authService.isLoggedIn;
  }

}
