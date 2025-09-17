import {Component, HostListener, OnInit} from '@angular/core';
import {Location, NgClass, NgForOf, NgIf, NgTemplateOutlet} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {CommentFormComponent} from "./comment-form/comment-form.component";
import {CommentsDisplayComponent} from "./comments-display/comments-display.component";
import {catchError} from "rxjs/operators";
import {tap} from "rxjs";
import {UrlTransformModule} from "../../../utility/pipes/url-transform/url-transform.module";
import {TagComponent} from "../../tag/tag.component";
import {LikeBtnComponent} from "../../like-btn/like-btn.component";
import {fadeInAnimation} from "../../../utility/animations/fadeInAnimation";
import {PictureDto} from "../../../utility/dtos/PictureDto";
import {PictureService} from "../../../../services/api/picture/picture.service";
import {extractQueryParams} from "../../../utility/extractQueryParams";
import {QueryModalEnum} from "../query-modal.enum";
import {CommentDto} from "../../../utility/dtos/CommentDto";
import { ModBtnsComponent } from '../../mod-btn/mod-btn.component';
import { ShareBtnComponent } from "../../share-btn/share-btn.component";

@Component({
  selector: 'pp-view-picture-modal',
  templateUrl: './view-picture-modal.component.html',
  styleUrls: ['./view-picture-modal.component.scss'],
  standalone: true,
  imports: [
    UrlTransformModule,
    NgTemplateOutlet,
    NgIf,
    RouterLink,
    NgForOf,
    NgClass,
    TagComponent,
    ModBtnsComponent,
    LikeBtnComponent,
    CommentFormComponent,
    CommentFormComponent,
    CommentsDisplayComponent,
    ShareBtnComponent
],
  animations: [
    fadeInAnimation
  ]
})
export class ViewPictureModalComponent implements OnInit {
  pic: PictureDto | undefined;
  isMobile = false;

  @HostListener('window:resize', ['$event'])
  onResize(): void {
    this.updateTemplateDisplay();
  }

  constructor(
    private picService: PictureService,
    private location: Location,
    private router: Router,
  ) {
  }

  ngOnInit() {
    this.updateTemplateDisplay();
    const queryParams = extractQueryParams(this.location.path());
    const picId = queryParams[QueryModalEnum.VIEW_PICTURE];
    if (picId) {
      this.picService.getById(picId)
        .pipe(
          tap((pic: PictureDto) => this.pic = pic),
          catchError(() => this.router.navigate([""], {queryParams: null}))
        )
        .subscribe();
    }
  }

  private updateTemplateDisplay(): void {
    this.isMobile = window.innerWidth < 769;
  }

  onCommentAdd(comment: CommentDto) {
    this.pic!.comments ? this.pic!.comments = [comment, ...this.pic!.comments] : this.pic!.comments = [comment];
  }

  closeModal() {
    this.router.navigate([], {queryParams: {}})
  }

}
