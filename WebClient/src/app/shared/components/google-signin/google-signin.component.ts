import { GoogleSigninButtonModule, SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, EventEmitter, HostListener, inject, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Subscription, tap } from 'rxjs';
import { AuthService } from 'src/app/services/api/account/auth.service';
import { CreateAccountDto } from '../../utility/dtos/CreateAccountDto';
import { GoogleLoginDto } from '../../utility/dtos/GoogleLoginDto';

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
  @Input() registerDetails: CreateAccountDto | undefined;
  @Output() loggedIn: EventEmitter<SocialUser> = new EventEmitter<SocialUser>();
  authSubscription!: Subscription;

  userLogin: GoogleLoginDto = {
    IdToken: '',
    Name: '',
    Email: '',
    PhotoUrl: '',
    FirstName: '',
    LastName: ''
  };

  private socialAuthService = inject(SocialAuthService)
  private authService = inject(AuthService)

  googleButtonWidth = window.innerWidth > 388 ? 388 : window.innerWidth;

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this.googleButtonWidth = event.target.innerWidth;
  }

  ngOnInit() {
    this.authSubscription = this.socialAuthService.authState.subscribe((user) => {
      this.userLogin.IdToken = user.idToken
      this.userLogin.Name = user.name
      this.userLogin.Email = user.email
      this.userLogin.PhotoUrl = user.photoUrl
      this.userLogin.FirstName = user.firstName
      this.userLogin.LastName = user.lastName
      this.userLogin.Password = this.registerDetails?.password
      this.userLogin.ConfirmPassword = this.registerDetails?.confirmPassword

      this.authService.loginwithGoogle(this.userLogin)
        .pipe(tap(() => this.loggedIn.emit()))
        .subscribe({
          error: (err) => {
            const errorCode = err?.error?.error?.code || err?.error?.code;
            if (errorCode === 'EMAIL_EXISTS') {
              this.loggedIn.emit(user)
            }
          }
        });
    });
  }

  googleSignin(googleWrapper: any) {
    googleWrapper.click();
  }

  ngOnDestroy() {
    this.authSubscription.unsubscribe();
  }

  
}