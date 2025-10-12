import { Component, inject } from '@angular/core';

import { ToastrService } from 'ngx-toastr';
import { catchError, tap } from 'rxjs';
import { AccountService } from 'src/app/services/api/account/account.service';
import { AccountTableComponent } from 'src/app/shared/components/account-table/account-table.component';
import { TextButtonComponent } from 'src/app/shared/components/text-button/text-button.component';

@Component({
    selector: 'pp-admin-page',
    templateUrl: './admin-page.component.html',
    standalone: true,
    imports: [AccountTableComponent, TextButtonComponent]
})
export class AdminPageComponent {
  private toastrService = inject(ToastrService);
  private accountService = inject(AccountService);
  
  recievedIds : string[] = []

  banUsers(table : AccountTableComponent){    
    let anyError = false
    for (let x = 0; x < this.recievedIds.length; x++) {
      this.accountService.banUserById(this.recievedIds[x]).pipe(
        tap(() => {if (x == this.recievedIds.length-1) {table.refresh()}})
      )
      .subscribe();
    }
    if (!anyError) {this.toastrService.success("Slut")}
  }
}
