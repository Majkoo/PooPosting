import {ChangeDetectorRef, Component, inject, ViewChild} from '@angular/core';
import {AddPostService} from "../add-post.service";
import {CropperComponent} from "angular-cropperjs";
import {Router} from "@angular/router";
import {fadeInAnimation} from "../../../shared/utility/animations/fadeInAnimation";

@Component({
  selector: 'pp-upload',
  templateUrl: 'upload.component.html',
  styles: [
    `
    * {
      @apply transition-all duration-200 ease-in-out disabled:opacity-60;
    }
    `
  ],
  animations: [fadeInAnimation]
})
export class UploadComponent {
  @ViewChild('cropperComponent') cropperComponent!: CropperComponent & HTMLElement;

  private add = inject(AddPostService);
  private router = inject(Router);
  private cdr = inject(ChangeDetectorRef);

  changeAspectRatio(val: number) {
    this.cropperComponent.cropper.setAspectRatio(val);
    this.add.inMemoryCropPictureData.aspectRatio = val;
    this.cdr.markForCheck();
  }
  async onFileChange(target: EventTarget | null) {
    const htmlTarget = target as HTMLInputElement
    if (!htmlTarget?.files) return;
    await this.fileToUrl(htmlTarget.files[0]);
  }


  fileToUrl(file: File): Promise<void> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = () => {
        this.cdr.markForCheck();
        this.add.inMemoryCropPictureData.rawFileUrl = reader.result as string
        resolve();
      };
      reader.onloadend = () => {
        this.cropperComponent.ready.subscribe(() => {
          this.changeAspectRatio(4/3);
          this.cropperComponent.cropper.enable();
          this.cdr.markForCheck();
          this.cropperCrop();
          resolve();
        })
      };
      reader.readAsDataURL(file);
    });
  }

  reset() {
    this.add.inMemoryCreatePictureDto = {};
    this.add.inMemoryCropPictureData = {
      cropBoxData: {},
      rawFileUrl: '',
      aspectRatio: 4/3
    };
    this.cropperComponent.cropper.enable();
    this.cdr.markForCheck();
  }

  onCropperReady() {
    this.cropperComponent.cropper.setAspectRatio(this.aspectRatio);
    this.cropperComponent.cropper.setCropBoxData(this.add.inMemoryCropPictureData.cropBoxData);
  }
  async goNext() {
    if (this.canProceed) {
      await this.router.navigate(['/add-post/details'])
    }
  }

  public cropperCrop() {
    this.add.inMemoryCropPictureData.cropBoxData = this.cropperComponent?.cropper?.getCropBoxData();
    this.add.inMemoryCreatePictureDto.url = this.cropperComponent?.cropper?.getCroppedCanvas()?.toDataURL();
    this.cdr.markForCheck();
  }

  get canProceed() {
    return this.add.canGoToDetails;
  }
  protected get rawFileUrl() {
    return this.add.inMemoryCropPictureData.rawFileUrl;
  }

  protected get aspectRatio() {
    return this.add.inMemoryCropPictureData.aspectRatio;
  }

}
