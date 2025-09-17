import { Injectable } from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {AccountDto} from "../../shared/utility/dtos/AccountDto";
import {UpdateAccountEmailDto} from "../../shared/utility/dtos/UpdateAccountEmailDto";
import {UpdateAccountPasswordDto} from "../../shared/utility/dtos/UpdateAccountPasswordDto";
import {UpdateAccountDescriptionDto} from "../../shared/utility/dtos/UpdateAccountDescriptionDto";

@Injectable({
  providedIn: 'root'
})
export class AccountUpdateService {

  constructor(
    private httpClient: HttpClient
  ) { }

  updateAccountEmail(data: UpdateAccountEmailDto) {
    return this.httpClient
      .post<AccountDto>(
        `${environment.picturesApiUrl}/account/update/email`,
        data,
        { responseType: "json" }
      );
  }

  updateAccountPassword(data: UpdateAccountPasswordDto) {
    return this.httpClient
      .post<AccountDto>(
        `${environment.picturesApiUrl}/account/update/password`,
        data,
        { responseType: "json" }
      );
  }

  updateAccountDescription(data: UpdateAccountDescriptionDto) {
    return this.httpClient
      .patch<AccountDto>(
        `${environment.picturesApiUrl}/account/update/description`,
        data,
        { responseType: "json" }
      );
  }

  updateAccountProfilePicture(file: string) {
    return this.httpClient
      .patch<AccountDto>(
        `${environment.picturesApiUrl}/account/update/profile-picture`,
        file,
        { responseType: "json" }
      );
  }

  updateAccountBackgroundPicture(file: string) {
    return this.httpClient
      .patch<AccountDto>(
        `${environment.picturesApiUrl}/account/update/background-picture`,
        file,
        { responseType: "json" }
      );
  }
}
