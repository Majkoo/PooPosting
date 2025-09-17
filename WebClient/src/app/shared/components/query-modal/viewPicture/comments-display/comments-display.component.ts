import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  inject,
  Input,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {BehaviorSubject, Subscription, switchMap} from "rxjs";
import {map} from "rxjs/operators";
import {CommentComponent} from "./comment/comment.component";
import {PictureDto} from "../../../../utility/dtos/PictureDto";
import {CommentService} from "../../../../../services/api/comment/comment.service";
import * as _ from 'lodash';


@Component({
  selector: 'pp-comments-display',
  standalone: true,
  imports: [CommonModule, CommentComponent],
  templateUrl: './comments-display.component.html',
  styleUrls: ['./comments-display.component.scss'],
})
export class CommentsDisplayComponent implements OnInit, AfterViewInit, OnDestroy {
  @Input({required: true}) pic!: PictureDto;
  @ViewChild('scrollableElement') scrollableElement!: ElementRef<HTMLElement>;

  private commService = inject(CommentService);

  private pageSize = 2;
  private pageNumber = 2;

  private enableScrollListener = true;
  private scrollSubject: BehaviorSubject<null> = new BehaviorSubject<null>(null);
  private masterSub: Subscription = new Subscription();

  @HostListener('scroll', ['$event.target'])
  onScroll(target: HTMLElement): void {
    const scrollPosition = target.scrollTop || 0;
    const elementHeight = target.offsetHeight;
    const scrollHeight = target.scrollHeight;
    const threshold = elementHeight * 0.75;

    const position = scrollHeight - scrollPosition - elementHeight;
    const isAtBottom =  position < threshold;
    if (isAtBottom && this.enableScrollListener
    ) {
      this.scrollSubject.next(null);
    }
  }

  ngOnInit() {
    this.masterSub = this.scrollSubject.pipe(
      switchMap(() => this.fetchComments(this.pageSize, this.pageNumber))
    ).subscribe();
  }

  ngAfterViewInit() {
    const defaultFetchesCount = 5;
    const totalCommentCountReturnedByServer = this.pic.commentCount;
    const alreadyFetchedCount = this.pic.comments.length;
    const remainingComments = totalCommentCountReturnedByServer - alreadyFetchedCount;
    const totalFetchesRequired = Math.ceil(remainingComments / this.pageSize);

    const fetchesCount = Math.min(totalFetchesRequired, defaultFetchesCount);

    for (let i = 0; i < fetchesCount; i++) {
      this.fetchComments(this.pageSize, this.pageNumber + i).subscribe();
    }
  }


  ngOnDestroy() {
    this.masterSub.unsubscribe();
  }

  fetchComments = (pageSize: number, pageNumber: number) => {
    return this.commService
      .getCommentsForPicture(this.pic.id, pageSize, pageNumber)
      .pipe(
        map((res) => {
          this.pic.comments =  _.uniqBy([...this.pic.comments, ...res.items], (i) => i.id);
          res.page === res.totalPages ? this.masterSub.unsubscribe() : this.pageNumber = res.page + 1;
          this.pageSize = res.items.length;
          this.enableScrollListener = true;
        })
      )

  }

}
