import {AfterContentInit, Component, inject} from '@angular/core';
import {Router} from "@angular/router";
import {AddPostService} from "../add-post.service";
import {fadeInAnimation} from "../../../shared/utility/animations/fadeInAnimation";
import {CreatePictureDto} from "../models/createPictureDto";

@Component({
  selector: 'pp-review',
  template: `
    <pp-created-post-card-preview [postData]="post" @fadeIn />

    <div class="mt-4 flex items-center justify-between">
      <button
        class="flex gap-1 text-white px-4 py-2 rounded-lg whitespace-nowrap bg-primary-800 dark:bg-dark dark:bg-dark-dark-primary-800 disabled:opacity-60"
        (click)="goBack()"
      >
        Previous step
      </button>
      <button
        class="flex gap-1 text-white px-4 py-2 rounded-lg whitespace-nowrap bg-cta dark:dark-bg-cta disabled:opacity-60"
        [disabled]="!canFinish"
        (click)="finish()"
      >
        Submit
      </button>
    </div>
  `,
  animations: [fadeInAnimation]
})
export class ReviewComponent implements AfterContentInit {
  private router = inject(Router);
  private add = inject(AddPostService);
  post: CreatePictureDto = this.add.inMemoryCreatePictureDto as CreatePictureDto;

  async ngAfterContentInit() {
    if (!this.add.canGoToDetails) await this.router.navigate(['/add-post/details']);
  }

  async goBack() {
    await this.router.navigate(['/add-post/details']);
  }

  async finish() {
    this.add.submitSubject.next();
  }

  get canFinish() {
    return this.add.canFinish;
  }

}
