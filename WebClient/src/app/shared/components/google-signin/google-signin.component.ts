import { GoogleSigninButtonModule, SocialAuthService } from '@abacritt/angularx-social-login';
import { Component, EventEmitter, inject, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription, tap } from 'rxjs';
import { AuthService } from 'src/app/services/api/account/auth.service';

declare global {
  interface Window {
    google: any;
  }
}

@Component({
  selector: 'pp-google-signin',
  templateUrl: './google-signin.component.html',
  standalone: true,
  imports: [GoogleSigninButtonModule]
//   styleUrls: ['./google-signin.component.scss'],
})
export class GoogleSigninComponent implements OnInit, OnDestroy {
  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter<boolean>();
  authSubscription!: Subscription;

  private socialAuthService = inject(SocialAuthService)
  private authService = inject(AuthService)

  ngOnInit() {
    this.authSubscription = this.socialAuthService.authState.subscribe((user) => {
      this.authService.loginwithGoogle(user).pipe(tap(x => this.loggedIn.emit())).subscribe()
    });
  }

  googleSignin(googleWrapper: any) {
    googleWrapper.click();
  }
  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }
}