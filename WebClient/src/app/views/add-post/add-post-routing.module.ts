import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AddPostComponent} from "./add-post.component";
import {UploadComponent} from "./upload/upload.component";
import {DetailsComponent} from "./details/details.component";
import {ReviewComponent} from "./review/review.component";

const routes: Routes = [
  {
    path: '',
    component: AddPostComponent,
    children: [
      {
        path: 'upload',
        component: UploadComponent
      },
      {
        path: 'details',
        component: DetailsComponent
      },
      {
        path: 'review',
        component: ReviewComponent
      },
      {
        path: '',
        redirectTo: 'upload',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddPostRoutingModule { }
