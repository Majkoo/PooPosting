import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpParams} from "@angular/common/http";
import { environment } from 'src/environments/environment';
import { PictureDto } from 'src/app/shared/utility/dtos/PictureDto';

@Injectable({
  providedIn: 'root'
})
export class AccountPicturesService {

  constructor(
    private httpClient: HttpClient
  ) { }

  getPostedPictures(accId: string, pageSize: number, pageNumber: number): Observable<PictureDto> {
    return this.httpClient
      .get<PictureDto>(
        `${environment.apiUrl}/account/${accId}/picture/posted`,
        {
          responseType: "json",
          params: new HttpParams()
            .set("PageSize", pageSize)
            .set("PageNumber", pageNumber)
        }
      );
  }

  getLikedPictures(accId: string, pageSize: number, pageNumber: number): Observable<PictureDto> {
    return this.httpClient
      .get<PictureDto>(
        `${environment.apiUrl}/account/${accId}/picture/liked`,
        {
          responseType: "json",
          params: new HttpParams()
            .set("PageSize", pageSize)
            .set("PageNumber", pageNumber)
        }
      );
  }
}
