import {Component, inject, Input} from '@angular/core';
import {RouterLink} from "@angular/router";
import {UrlTransformModule} from "../../../shared/utility/pipes/url-transform/url-transform.module";
import {PictureDto} from "../../../shared/utility/dtos/PictureDto";
import {NgClass, NgOptimizedImage, NgStyle} from "@angular/common";
import {AuthService} from "../../../services/api/account/auth.service";
import {QueryModalEnum} from "../../../shared/components/query-modal/query-modal.enum";
import {OpenQueryModalDirective} from "../../../shared/components/query-modal/open-query-modal.directive";

@Component({
  selector: 'pp-post-preview',
  standalone: true,
  imports: [
    RouterLink,
    UrlTransformModule,
    NgStyle,
    NgClass,
    NgOptimizedImage,
    OpenQueryModalDirective
  ],
  styles: [`
    .image-wrapper {
      @apply relative bg-contain overflow-hidden cursor-pointer drop-shadow-xl rounded-lg aspect-square;

      .image-preview {
        @apply object-cover transition duration-700 transform w-full aspect-square;
      }

      .data-block {
        @apply bottom-0 text-white w-full absolute transition-all duration-700 transform flex justify-between items-center gap-4;
        .data-piece {
          @apply flex items-center justify-center gap-0.5 bg-black bg-opacity-40 py-2 px-4;
        }
      }

    }
  `],
  template: `
    <div class="image-wrapper group">
      <img
        class="image-preview group-hover:scale-125"
        src="{{pic.url | urlTransform}}"
        alt="{{pic.description}}"
        ppOpenQueryModal
        [modalMode]="QueryModalEnum.VIEW_PICTURE"
        [id]="pic.id"
      />

      <div class="data-block opacity-0 group-hover:opacity-100">

        <div class="data-piece rounded-tr-xl">
          {{pic.commentCount}}
          <span
            [ngClass]=" {
              'cursor-pointer': isLoggedOn,
              'opacity-60': !isLoggedOn,
              'icon-vector': true,
            }"></span>
        </div>

        <div class="data-piece rounded-tl-xl">
          {{pic.likeCount}}
          <span
            [ngClass]=" {
              'cursor-pointer': isLoggedOn,
              'opacity-60': !isLoggedOn,
              'icon-heart--filled': pic.isLiked,
              'icon-heart--empty': !pic.isLiked
            }"></span>
        </div>

      </div>

    </div>
  `,

})
export class PostPreviewComponent {
  @Input({required: true}) pic!: PictureDto;

  private authService = inject(AuthService);

  get isLoggedOn() {
    return this.authService.isLoggedIn;
  }

  protected readonly QueryModalEnum = QueryModalEnum;
}
