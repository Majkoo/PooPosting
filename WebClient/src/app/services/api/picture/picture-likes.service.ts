import { Injectable } from '@angular/core';
import {Observable, Subject, tap} from "rxjs";
import {HttpClient} from "@angular/common/http";
import {PictureDto} from "../../../shared/utility/dtos/PictureDto";
import {environment} from "../../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PictureLikesService {

  constructor(
    private httpClient: HttpClient
  ) { }
  private likedPictureSubject = new Subject<PictureDto>();

  likePicture(id: string): Observable<PictureDto> {
    return this.httpClient
      .patch<PictureDto>(
        `${environment.apiUrl}/picture/${id}/like/vote-up`,
        {},
        { responseType: "json" }
      )
      .pipe(tap((res: PictureDto) => this.likedPictureSubject.next(res)));
  }

  get likedPicture$(): Observable<PictureDto> {
    return this.likedPictureSubject.asObservable();
  }

}
