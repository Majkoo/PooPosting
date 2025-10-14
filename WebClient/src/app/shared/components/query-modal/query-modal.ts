import {Component, inject, OnInit} from '@angular/core';

import {DialogModule} from "primeng/dialog";
import {DialogService} from "primeng/dynamicdialog";
import {QueryModalService} from "./query-modal.service";
@Component({
    selector: 'pp-query-modal',
    template: ``,
    standalone: true,
    imports: [
    DialogModule
],
    providers: [
        DialogService,
    ]
})
export class QueryModalComponent implements OnInit {

  private queryModalService = inject(QueryModalService);

  ngOnInit() {
    this.queryModalService.init();
  }

}
