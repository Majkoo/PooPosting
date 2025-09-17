import { Injectable, Type } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ActivatedRoute, Router } from '@angular/router';
import {QueryModalEnum} from "./query-modal.enum";
import {ViewPictureModalComponent} from "./viewPicture/view-picture-modal.component";

@Injectable({
  providedIn: 'root',
})
export class QueryModalService {
  dialogRef: DynamicDialogRef | undefined;

  constructor(
    private dialogService: DialogService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  init() {
    this.router.events.subscribe(() => {
      const viewPictureParam = this.route.snapshot.queryParamMap.get(QueryModalEnum.VIEW_PICTURE);
      if (viewPictureParam) {
        this.open(ViewPictureModalComponent);
      } else {
        this.close();
      }
    });
  }

  open(component: Type<object>) {
    if (this.dialogService.dialogComponentRefMap.size !== 0) return;
    this.dialogRef = this.dialogService.open(component, {
      styleClass: 'w-screen h-screen rounded-0 p-0',
      modal: true,
      showHeader: false,
    });
  }

  close() {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
  }
}
