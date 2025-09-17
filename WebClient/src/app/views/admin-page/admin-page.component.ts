import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { catchError, tap } from 'rxjs';
import { AccountService } from 'src/app/services/api/account/account.service';
import { AccountTableComponent } from 'src/app/shared/components/account-table/account-table.component';
import { TextButtonComponent } from 'src/app/shared/components/text-button/text-button.component';

@Component({
  selector: 'pp-admin-page',
  standalone: true,
  templateUrl: './admin-page.component.html',
  imports: [AccountTableComponent, TextButtonComponent, CommonModule]
})
export class AdminPageComponent {
  private toastrService = inject(ToastrService);
  private accountService = inject(AccountService);
  
  recievedIds : string[] = []

  banUsers(table : AccountTableComponent){    
    let anyError = false
    for (let x = 0; x < this.recievedIds.length; x++) {
      this.accountService.banUserById(this.recievedIds[x]).pipe(
        catchError(async () => (this.toastrService.error("Something went wrong"), anyError=true)),
        tap(() => {if (x == this.recievedIds.length-1) {table.refresh()}})
      )
      .subscribe();
    }
    if (!anyError) {this.toastrService.success("Slut")}
  }
}
