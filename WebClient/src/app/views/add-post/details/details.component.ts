import {AfterContentInit, Component, inject, ViewChild} from '@angular/core';
import {AddPostService} from "../add-post.service";
import {Router} from "@angular/router";
import {fadeInAnimation} from "../../../shared/utility/animations/fadeInAnimation";
import {PostDetailsData} from "../models/postDetailsData";
import {NgForm} from "@angular/forms";

@Component({
  selector: 'pp-details',
  template: `
    <div
      class="flex flex-col gap-MD"
      @fadeIn
    >

      <div class="flex flex-col gap-XS">
        Description:
        <textarea
          class="border-2 p-SM rounded-LG"
          rows="3"
          placeholder="Post description..."
          [(ngModel)]="postDetailsTemp.description"
          name="description"
          [maxlength]="150"
        ></textarea>
      </div>

      <div class="flex flex-col gap-XS">
        Tags:
        <input
          type="text"
          class="border-2 px-SM py-XS rounded-LG"
          placeholder="Post tags..."
          name="tags"
          (keyup)="tagChanges()"
          [(ngModel)]="postDetailsTemp.tags"
        >
      </div>

      <!--      <div class="flex flex-col gap-XS">-->
      <!--        Post Visibility:-->
      <!--        <div class="ml-SM">-->
      <!--          <div class="flex flex-row gap-XS">-->
      <!--            <input-->
      <!--              type="radio"-->
      <!--              id="public"-->
      <!--              name="visibilityOption"-->
      <!--              [value]="PostVisibility.PUBLIC"-->
      <!--              [(ngModel)]="postDetailsTemp.visibilityOption"-->
      <!--            >-->
      <!--            <label for="public">Public</label>-->
      <!--          </div>-->
      <!--          <div class="flex flex-row gap-XS">-->
      <!--            <input-->
      <!--              type="radio"-->
      <!--              id="feed"-->
      <!--              name="visibilityOption"-->
      <!--              [value]="PostVisibility.FEED"-->
      <!--              [(ngModel)]="postDetailsTemp.visibilityOption"-->
      <!--            >-->
      <!--            <label for="feed">Feed only</label>-->
      <!--          </div>-->
      <!--          <div class="flex flex-row gap-XS">-->
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
          class="flex gap-XS text-white px-MD py-SM rounded-LG whitespace-nowrap bg-primary-base dark:bg-dark dark:bg-dark-dark-primary-base disabled:opacity-60"
          (click)="goBack()"
        >
          Previous step
        </button>
        <button
          class="flex gap-XS text-white px-MD py-SM rounded-LG whitespace-nowrap bg-cta-light dark:dark-bg-cta-light disabled:opacity-60"
          [disabled]="!canProceed"
          (click)="goNext()"
        >
          Next step
        </button>
      </div>
    </div>
  `,
  styles: [],
  animations: [fadeInAnimation]
})
export class DetailsComponent implements AfterContentInit {
  @ViewChild('form', {static: true}) form!: NgForm;
  private addPostService = inject(AddPostService);
  private router = inject(Router);

  postDetailsTemp: Partial<PostDetailsData> = {};

  async ngAfterContentInit() {
    if (!this.addPostService.canGoToDetails) await this.router.navigate(['/add-post/upload']);
    this.postDetailsTemp = {
      ...this.addPostService.inMemoryCreatePictureDto,
      tags: this.addPostService.inMemoryCreatePictureDto.tags?.join(" ")
    }
  }

  tagChanges() {
    const val =  this.postDetailsTemp.tags ?? "";
    const tags = val
      .split(" ")
      .slice(0, 4)
      .map(tag => tag.substring(0, 25));

    this.addPostService.inMemoryCreatePictureDto.tags = tags;
    this.postDetailsTemp.tags = tags.join(" ");
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

  get tags() {
    return this.postDetailsTemp.tags;
  }
}
