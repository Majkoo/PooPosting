import {Component} from '@angular/core';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'pp-post-preview-skeleton',
  templateUrl: './post-preview-skeleton.component.html',
  standalone: true,
  imports: [CommonModule],
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
export class PostPreviewSkeletonComponent {}
