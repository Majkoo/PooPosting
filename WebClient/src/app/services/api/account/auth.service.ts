import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {LoginDto} from "../../../shared/utility/dtos/LoginDto";
import {AuthData} from "../../../shared/utility/models/authData";
import {environment} from "../../../../environments/environment";
import {CreateAccountDto} from "../../../shared/utility/dtos/CreateAccountDto";
import { GoogleLoginDto } from 'src/app/shared/utility/dtos/GoogleLoginDto';
import { SocialUser } from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private httpClient: HttpClient,
  ) { }

  login(dto: LoginDto): Observable<AuthData> {
    return this.httpClient
      .post<AuthData>(
        `${environment.apiUrl}/auth/login`,
        dto,
        {responseType: "json",})
      .pipe(tap((res) => this.saveJwtData(res)));
  }

  loginwithGoogle(dto: SocialUser): Observable<AuthData> {
    return this.httpClient
      .post<AuthData>(
        `${environment.apiUrl}/auth/google`,
        dto,
        {responseType: "json",})
      .pipe(tap((res) => this.saveJwtData(res)));
  }

  register(dto: CreateAccountDto): Observable<void> {
    return this.httpClient
      .post<void>(
        `${environment.apiUrl}/auth/register`,
        dto,
        {responseType: "json",});
  }

  refreshToken(): Observable<AuthData> {
    return this.httpClient
      .post<AuthData>(
        `${environment.apiUrl}/auth/refreshToken`,
        this.getJwtData(),
        {responseType: "json",})
      .pipe(tap((res) => this.saveJwtData(res)));
  }

  forgetTokens(): Observable<void> {
    return this.httpClient
      .post<void>(
        `${environment.apiUrl}/auth/forgetTokens`,
        this.getJwtData(),
        {responseType: "json",})
      .pipe(tap(() => this.forgetAuthData()));
  }

  saveJwtData(jwtData: AuthData) {
    localStorage.setItem("jwtUserData", JSON.stringify(jwtData));
  }

  forgetAuthData() {
    localStorage.removeItem("jwtUserData");
    window.location.reload();
  }

  getJwtData(): AuthData | null {
    const dataString: string | null = localStorage.getItem("jwtUserData")
    return dataString ? JSON.parse(dataString) : null;
  }

  get isLoggedIn(): boolean {
    return this.getJwtData() != null;
  }

  get isModeratororAdmin(): boolean {
    return this.isLoggedIn && this.getJwtData()!.roleId == 2 || this.getJwtData()!.roleId == 3
  }

  // verifyJwt(data: VerifyJwtDto): Observable<JwtUserData> {
  //   return this.httpClient
  //     .post<JwtUserData>(
  //       `${environment.picturesApiUrl}/account/auth/verifyJwt`,
  //       data,
  //       {responseType: "json",});
  // }

}
