import {Component} from '@angular/core';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'pp-post-preview-skeleton',
  templateUrl: './post-preview-skeleton.component.html',
  standalone: true,
  imports: [CommonModule],
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
  `]
})
export class PostPreviewSkeletonComponent {}
