import {
  AfterContentInit,
  Component,
  inject,
  ViewChild
} from '@angular/core';
import {AddPostService} from "../add-post.service";
import {Router} from "@angular/router";
import {fadeInAnimation} from "../../../shared/utility/animations/fadeInAnimation";
import {PostDetailsData} from "../models/postDetailsData";
import {NgForm} from "@angular/forms";

@Component({
    selector: 'pp-details',
    template: `
    <div
      class="flex flex-col gap-md"
      @fadeIn
    >

      <div class="flex flex-col gap-xs">
        Description:
        <textarea
          class="border-2 p-sm rounded-lg"
          rows="3"
          placeholder="Post description..."
          [(ngModel)]="postDetailsTemp.description"
          name="description"
          [maxlength]="150"
        ></textarea>
      </div>

      <div class="flex flex-col flex-wrap gap-xs">
        Tags:
        <pp-tag-input [tags]="tags" (tagsChange)="syncTags($event)"/>
      </div>
      <!--      <div class="flex flex-col gap-xs">-->
      <!--        Post Visibility:-->
      <!--        <div class="ml-sm">-->
      <!--          <div class="flex flex-row gap-xs">-->
      <!--            <input-->
      <!--              type="radio"-->
      <!--              id="public"-->
      <!--              name="visibilityOption"-->
      <!--              [value]="PostVisibility.PUBLIC"-->
      <!--              [(ngModel)]="postDetailsTemp.visibilityOption"-->
      <!--            >-->
      <!--            <label for="public">Public</label>-->
      <!--          </div>-->
      <!--          <div class="flex flex-row gap-xs">-->
      <!--            <input-->
      <!--              type="radio"-->
      <!--              id="feed"-->
      <!--              name="visibilityOption"-->
      <!--              [value]="PostVisibility.FEED"-->
      <!--              [(ngModel)]="postDetailsTemp.visibilityOption"-->
      <!--            >-->
      <!--            <label for="feed">Feed only</label>-->
      <!--          </div>-->
      <!--          <div class="flex flex-row gap-xs">-->
      <!--            <input-->
      <!--              type="radio"-->
      <!--              id="private"-->
      <!--              name="visibilityOption"-->
      <!--              [value]="PostVisibility.PRIVATE"-->
      <!--              [(ngModel)]="postDetailsTemp.visibilityOption"-->
      <!--            >-->
      <!--            <label for="private">Private</label>-->
      <!--          </div>-->
      <!--        </div>-->
      <!--      </div>-->

      <div class="mt-4 flex items-center justify-between">
        <button
          class="flex gap-xs text-regular white-text px-md py-sm rounded-lg whitespace-nowrap bg-primary-800 dark:bg-dark dark:bg-dark-dark-primary-800 disabled:opacity-60"
          (click)="goBack()"
        >
          Previous step
        </button>
        <button
          class="flex gap-xs text-regular white-text px-md py-sm rounded-lg whitespace-nowrap bg-cta-500 dark:dark-bg-cta-500 disabled:opacity-60"
          [disabled]="!canProceed"
          (click)="goNext()"
        >
          Next step
        </button>
      </div>
    </div>
  `,
    styles: [],
    animations: [fadeInAnimation],
    standalone: false
})
export class DetailsComponent implements AfterContentInit {
  @ViewChild('form', {static: true}) form!: NgForm;
  private addPostService = inject(AddPostService);
  private router = inject(Router);

  postDetailsTemp: Partial<PostDetailsData> = {};
  tags: string[] = [];
  currentTag = '';

  async ngAfterContentInit() {
    if (!this.addPostService.canGoToDetails) await this.router.navigate(['/add-post/upload']);

    const savedTags = this.addPostService.inMemoryCreatePictureDto.tags ?? [];
    this.tags = [...savedTags];
    this.postDetailsTemp = {
      ...this.addPostService.inMemoryCreatePictureDto,
      tags: undefined
    }
  }

  public syncTags(tags: string[]) {
    this.addPostService.inMemoryCreatePictureDto.tags = tags;
  }

  async goBack() {
    await this.router.navigate(['/add-post/upload']);
  }

  async goNext() {
    if (this.canProceed) {
      this.addPostService.inMemoryCreatePictureDto.description = this.postDetailsTemp.description;
      await this.router.navigate(['/add-post/review'])
    }
  }

  get canProceed() {
    return this.addPostService.canGoToReview;
  }
}
