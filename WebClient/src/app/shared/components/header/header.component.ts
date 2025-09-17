import {Component, inject, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {AccountDto} from "../../utility/dtos/AccountDto";
import {AuthService} from "../../../services/api/account/auth.service";
import {AccountService} from "../../../services/api/account/account.service";

@Component({
  selector: 'pp-header',
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  private authService = inject(AuthService);
  private accountService = inject(AccountService);

  account$: Observable<AccountDto> | undefined;

  onLogoClick() {
    document.documentElement.scrollTop = 0;
  }

  ngOnInit() {
    if (this.authService.isLoggedIn) {
      this.account$ = this.accountService.getMe();
      
    }
  }
}
