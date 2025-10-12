import {Component, inject, OnDestroy, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {PaginatorModule} from "primeng/paginator";
import {Subscription} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {LoginDto} from "../../shared/utility/dtos/LoginDto";
import {validationErrorAnimation} from "../../shared/utility/animations/validationErrorAnimation";
import {fadeInAnimation} from "../../shared/utility/animations/fadeInAnimation";
import {AuthService} from "../../services/api/account/auth.service";
import { GoogleSigninComponent } from 'src/app/shared/components/google-signin/google-signin.component';
import { SocialAuthService } from '@abacritt/angularx-social-login';
import { LoginPopupComponent } from "src/app/shared/components/login-popup/login-popup.component";

@Component({
  selector: 'pp-login',
  standalone: true,
  imports: [CommonModule, FormsModule, PaginatorModule, RouterLink, GoogleSigninComponent, LoginPopupComponent],
  templateUrl: './login.component.html',
  styles: [`
    .input {
      @apply border-1 w-full py-sm px-md rounded-lg transition ease-in-out
    }
  `],
  animations: [
    validationErrorAnimation,
    fadeInAnimation
  ]
})
export class LoginComponent implements OnDestroy, OnInit {
  private sub = new Subscription();
  awaitSubmit = false;
  loginDto: LoginDto = {
    nickname: "", // nickname is username or e-mail 😡
    password: ""
  };

  private authService = inject(AuthService);
  private msgService = inject(ToastrService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  public loginPopupVisible = false;

  onSubmit() {
    if (this.awaitSubmit) return;

    this.awaitSubmit = true;

    this.sub.add(
      this.authService.login(this.loginDto).subscribe({
        next: () => {
          this.afterLogIn()
        },
        error: (err: HttpErrorResponse) => {
          this.awaitSubmit = false;
        }
      })
    );
  }

  afterLogIn(){
    this.msgService.success("Successfully logged in", "Success");
    this.awaitSubmit = false;
    this.router.navigateByUrl('/');
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  ngOnInit(){
    const showPopup = this.route.snapshot.queryParamMap.get('showPopup');
    if (showPopup === 'true') {
      this.loginPopupVisible = true
    }
  }
}
