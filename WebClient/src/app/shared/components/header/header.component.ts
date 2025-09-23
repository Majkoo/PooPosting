import {Component, HostListener, inject, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {AccountDto} from "../../utility/dtos/AccountDto";
import {AuthService} from "../../../services/api/account/auth.service";
import {AccountService} from "../../../services/api/account/account.service";
import { animate, state, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'pp-header',
  templateUrl: './header.component.html',
  animations: [
    trigger('animate', [
      state('hidden', style({
        top: "-56px"
      })),
      state('visible', style({
        top: 0
      })),
      transition('hidden <=> visible', [
        animate('0.5s ease')
      ])
    ])
  ]
})
export class HeaderComponent implements OnInit {
  private authService = inject(AuthService);
  private accountService = inject(AccountService);
  lastScrollTop = 0;
  headershown = "visible";
  account$: Observable<AccountDto> | undefined;


  @HostListener('window:scroll', ['$event']) onWindowScroll(e) {
    const scrollTop = e.target['scrollingElement'].scrollTop;

    this.lastScrollTop - scrollTop < 0 ? this.headershown = "hidden" : this.headershown = "visible";
    
    this.lastScrollTop = scrollTop;    
  };

  onLogoClick() {
    document.documentElement.scrollTop = 0;
  }

  ngOnInit() {
    if (this.authService.isLoggedIn) {
      this.account$ = this.accountService.getMe();
      
    }
  }
}
