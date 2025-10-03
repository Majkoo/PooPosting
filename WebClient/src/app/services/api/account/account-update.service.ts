import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import {HttpClient} from "@angular/common/http";
import { AccountDto } from 'src/app/shared/utility/dtos/AccountDto';
import { UpdateAccountUsernameDto } from 'src/app/shared/utility/dtos/UpdateAccountUsernameDto';

@Injectable({
  providedIn: 'root'
})
export class AccountUpdateService {

  constructor(
    private httpClient: HttpClient
  ) { }
  // !!!
  // This whole file didn't work i'll fix it in next pr
  // !!!

  // updateAccountEmail(data: UpdateAccountEmailDto) {
  //   return this.httpClient
  //     .post<AccountDto>(
  //       `${environment.apiUrl}/account/update/email`,
  //       data,
  //       { responseType: "json" }
  //     );
  // }

  // updateAccountPassword(data: UpdateAccountPasswordDto) {
  //   return this.httpClient
  //     .post<AccountDto>(
  //       `${environment.apiUrl}/account/update/password`,
  //       data,
  //       { responseType: "json" }
  //     );
  // }

  // updateAccountDescription(data: UpdateAccountDescriptionDto) {
  //   return this.httpClient
  //     .patch<AccountDto>(
  //       `${environment.apiUrl}/account/update/description`,
  //       data,
  //       { responseType: "json" }
  //     );
  // }

  updateAccountUsername(data: UpdateAccountUsernameDto) {
    return this.httpClient
      .post<AccountDto>(
        `${environment.apiUrl}/account/update/username`,
        data,
        { responseType: "json" }
      );
  }

  updateAccountProfilePicture(file: string) {
    return this.httpClient
      .patch<AccountDto>(
        `${environment.apiUrl}/account/update/profile-picture`,
        file,
        { responseType: "json" }
      );
  }

  updateAccountBackgroundPicture(file: string) {
    return this.httpClient
      .patch<AccountDto>(
        `${environment.apiUrl}/account/update/background-picture`,
        file,
        { responseType: "json" }
      );
  }
}
