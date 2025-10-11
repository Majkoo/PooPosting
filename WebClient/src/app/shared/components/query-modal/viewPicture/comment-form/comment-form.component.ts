import {Component, EventEmitter, inject, Input, OnInit, Output} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {BehaviorSubject, Subject, switchMap} from "rxjs";
import {PictureDto} from "../../../../utility/dtos/PictureDto";
import {fadeInOutAnimation} from "../../../../utility/animations/fadeInOutAnimation";
import {CommentDto} from "../../../../utility/dtos/CommentDto";
import {AuthService} from "../../../../../services/api/account/auth.service";
import {CommentService} from "../../../../../services/api/comment/comment.service";
import { LoginPopupComponent } from "../../../login-popup/login-popup.component";

@Component({
  selector: 'pp-comment-form',
  standalone: true,
  imports: [CommonModule, FormsModule, LoginPopupComponent],
  templateUrl: './comment-form.component.html',
  animations: [fadeInOutAnimation]
})
export class CommentFormComponent implements OnInit {
  @Input({required: true}) pic!: PictureDto;
  @Output() commentAdded: EventEmitter<CommentDto> = new EventEmitter<CommentDto>();

  commentText: string = '';
  awaitSubmit: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private commentSubject = new Subject<string>();
  private authService = inject(AuthService);
  private commentService = inject(CommentService);

  loginPopupVisible = false;

  get isLoggedOn() {
    return this.authService.isLoggedIn;
  }

  ngOnInit() {
    this.commentSubject.pipe(
      switchMap(commentText => this.handleCommentRequest(commentText))
    ).subscribe((addedComment: CommentDto) => {
      this.awaitSubmit.next(false);
      this.commentAdded.emit(addedComment);
      this.commentText = '';
    });
  }

  private handleCommentRequest(commentText: string) {
    return this.commentService.addComment(this.pic.id, { text: commentText } as CommentDto);
  }

  comment() {
    if (this.isLoggedOn){
      this.awaitSubmit.next(true);
      this.commentSubject.next(this.commentText);
    }
    else{
      this.loginPopupVisible = true
    }
  }

}

