import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddPostRoutingModule } from './add-post-routing.module';
import {AddPostComponent} from "./add-post.component";
import { UploadComponent } from './upload/upload.component';
import { DetailsComponent } from './details/details.component';
import { ReviewComponent } from './review/review.component';
import {AngularCropperjsModule} from "angular-cropperjs";
import {FormsModule} from "@angular/forms";
import {PostCardComponent} from "../home/post-card/post-card.component";
import {LikeBtnComponent} from "../../shared/components/like-btn/like-btn.component";
import {MiniCommentComponent} from "../home/post-card/mini-comment/mini-comment.component";
import {TagComponent} from "../../shared/components/tag/tag.component";
import {UrlTransformModule} from "../../shared/utility/pipes/url-transform/url-transform.module";
import { CreatedPostCardPreviewComponent } from './review/created-post-card-preview/created-post-card-preview.component';
import { TagInputComponent } from "../../shared/components/tag-input/tag-input.component";


@NgModule({
  declarations: [
    AddPostComponent,
    UploadComponent,
    DetailsComponent,
    ReviewComponent,
    CreatedPostCardPreviewComponent
  ],
  exports: [
    AddPostComponent
  ],
  imports: [
    CommonModule,
    AddPostRoutingModule,
    AngularCropperjsModule,
    FormsModule,
    PostCardComponent,
    LikeBtnComponent,
    MiniCommentComponent,
    TagComponent,
    UrlTransformModule,
    TagInputComponent
]
})
export class AddPostModule { }
