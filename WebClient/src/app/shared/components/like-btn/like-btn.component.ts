import {Component, EventEmitter, inject, Input, OnDestroy, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {PictureDto} from "../../utility/dtos/PictureDto";
import {Subscription} from "rxjs";
import {likeStateAnimation} from "../../utility/animations/likeStateAnimation";
import {PictureLikesService} from "../../../services/api/picture/picture-likes.service";
import {AuthService} from "../../../services/api/account/auth.service";
import { LoginPopupComponent } from "../login-popup/login-popup.component";

@Component({
  selector: 'pp-like-btn',
  standalone: true,
  imports: [CommonModule, LoginPopupComponent],
  templateUrl: './like-btn.component.html',
  animations: [
    likeStateAnimation
  ]
})
export class LikeBtnComponent implements OnDestroy {
  @Input() cssClass?: string;
  @Input({required: true}) pic!: PictureDto;
  @Output() picChange: EventEmitter<PictureDto> = new EventEmitter<PictureDto>();

  private sub = new Subscription();
  private likeService = inject(PictureLikesService);
  private authService = inject(AuthService);

  public loginPopupVisible = false;

  like(id: string) {
    if (!this.isLoggedOn){
      this.loginPopupVisible = true
      return
    }
    this.sub.add(
      this.likeService.likePicture(id).subscribe({
        next: (result: PictureDto) => {
          this.pic = result;
        }
      })
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  get isLoggedOn() {
    return this.authService.isLoggedIn;
  }
}
