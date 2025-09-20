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
  templateUrl: './post-preview.component.html',
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
      @apply relative bg-contain overflow-hidden cursor-pointer drop-shadow-xl rounded-LG aspect-square;

      .image-preview {
        @apply object-cover transition duration-700 transform w-full aspect-square;
      }

      .data-block {
        @apply bottom-0 text-white w-full absolute transition-all duration-700 transform flex justify-between items-center gap-MD;
        .data-piece {
          @apply flex items-center justify-center gap-XS bg-black bg-opacity-40 py-SM px-MD;
        }
      }

    }
  `]
})
export class PostPreviewComponent {
  @Input({required: true}) pic!: PictureDto;

  private authService = inject(AuthService);

  get isLoggedOn() {
    return this.authService.isLoggedIn;
  }

  protected readonly QueryModalEnum = QueryModalEnum;
}
