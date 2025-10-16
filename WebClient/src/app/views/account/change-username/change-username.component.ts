import {Component, inject} from '@angular/core';
import {CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { AccountUpdateService } from 'src/app/services/api/account/account-update.service';
import { tap } from 'rxjs';
import { UpdateAccountUsernameDto } from 'src/app/shared/utility/dtos/UpdateAccountUsernameDto';

@Component({
    selector: 'pp-change-username',
    styles: [`
    .input {
      @apply border-1 my-md w-full py-sm px-md rounded-lg transition ease-in-out
    }
  `],
    imports: [CommonModule, DialogModule],
    templateUrl: './change-username.component.html'
})
export class ChangeUsernameComponent {
  private accountUpdateService = inject(AccountUpdateService)
  dialogVisible: boolean = false;
  
  openDialog() {
      this.dialogVisible = true;
  }
  
  closeDialog(option?: string): void {
    this.dialogVisible = false;
    if (option){
        let username: UpdateAccountUsernameDto = { username: option };
        this.accountUpdateService.updateAccountUsername(username).pipe(
            tap(x => {location.reload()})
        ).subscribe()
    }
  }

}
