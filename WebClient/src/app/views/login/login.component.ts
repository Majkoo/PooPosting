import {Component, inject, OnDestroy} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";
import {PaginatorModule} from "primeng/paginator";
import {Subscription} from "rxjs";
import {ToastrService} from "ngx-toastr";
import {Router, RouterLink} from "@angular/router";
import {HttpErrorResponse} from "@angular/common/http";
import {LoginDto} from "../../shared/utility/dtos/LoginDto";
import {validationErrorAnimation} from "../../shared/utility/animations/validationErrorAnimation";
import {fadeInAnimation} from "../../shared/utility/animations/fadeInAnimation";
import {AuthService} from "../../services/api/account/auth.service";

@Component({
  selector: 'pp-login',
  standalone: true,
  imports: [CommonModule, FormsModule, PaginatorModule, RouterLink],
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
export class LoginComponent implements OnDestroy {
  private sub = new Subscription();
  awaitSubmit = false;
  loginDto: LoginDto = {
    nickname: "",
    password: ""
  };

  private authService = inject(AuthService);
  private msgService = inject(ToastrService);
  private router = inject(Router);

  onSubmit() {
    if (this.awaitSubmit) return;

    this.awaitSubmit = true;

    this.sub.add(
      this.authService.login(this.loginDto).subscribe({
        next: () => {
          this.msgService.success("Successfully logged in", "Success");
          this.awaitSubmit = false;
          this.router.navigateByUrl('/');
        },
        error: (err: HttpErrorResponse) => {
          this.msgService.error(err.error, "Error");
          this.awaitSubmit = false;
        }
      })
    );
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
