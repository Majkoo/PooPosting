import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  CommentAccountInlineLinkComponent
} from "./account-inline-link/comment-account-inline-link.component";
import {fadeInOutAnimation} from "../../../../../utility/animations/fadeInOutAnimation";
import {CommentDto} from "../../../../../utility/dtos/CommentDto";
import { shortDateFormat } from 'src/app/shared/utility/constants';
import {DateAgoPipe} from "../../../../../utility/pipes/date-ago/date-ago.pipe";

@Component({
  selector: 'pp-comment',
  standalone: true,
  imports: [CommonModule, CommentAccountInlineLinkComponent, DateAgoPipe],
  templateUrl: './comment.component.html',
  animations: [
      fadeInOutAnimation
  ]
})
export class CommentComponent {
  @Input({required: true}) comm!: CommentDto;
  protected readonly shortDateFormat = shortDateFormat;
}
