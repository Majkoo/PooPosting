import {inject, Injectable} from '@angular/core';
import {exhaustMap, of, Subject} from "rxjs";
import {CropPictureData} from "./models/cropPictureData";
import {ToastrService} from "ngx-toastr";
import {defaultErrorHeading} from "../../shared/utility/constants";
import {catchError, switchMap} from "rxjs/operators";
import {Router} from "@angular/router";
import {CreatePictureDto} from "./models/createPictureDto";
import {PictureService} from "../../services/api/picture/picture.service";
import {SpinnerService} from "../../services/state/spinner.service";

@Injectable({
  providedIn: 'root'
})
export class AddPostService {
  private router = inject(Router);
  private toastrService = inject(ToastrService);
  private pictureService = inject(PictureService);
  private spinnerService = inject(SpinnerService);

  public inMemoryCreatePictureDto: Partial<CreatePictureDto> = {}
  public inMemoryCropPictureData: CropPictureData = {
    cropBoxData: {},
    rawFileUrl: '',
    aspectRatio: 4/3
  }

  submitSubject = new Subject<void>();
  constructor() {
    this.submitSubject.pipe(
      exhaustMap(() => {
        this.spinnerService.isLoadingBs.next(true);
        return this.pictureService.post(this.inMemoryCreatePictureDto as CreatePictureDto).pipe(
          switchMap(() => {
            this.toastrService.success("Successfully posted a picture");
            this.inMemoryCreatePictureDto = {};
            this.spinnerService.isLoadingBs.next(false);
            return this.router.navigate(['/']);
          }),
          catchError(() => {
            this.spinnerService.isLoadingBs.next(false);
            return of(this.toastrService.error(defaultErrorHeading));
          })
        );
      })
    ).subscribe();
  }

  get canGoToDetails() {
    return this.inMemoryCreatePictureDto?.url && this.inMemoryCropPictureData.rawFileUrl;
  }
  get canGoToReview() {
    return this.canGoToDetails;
      // &&
      // this.postDetailsData$.value.visibilityOption !== null &&
      // this.postDetailsData$.value.visibilityOption !== undefined;
  }
  get canFinish() {
    return this.canGoToReview;
  }

}
