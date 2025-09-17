import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, Subject, tap} from "rxjs";
import {environment} from "../../../../environments/environment";
import {CommentDto} from "../../../shared/utility/dtos/CommentDto";
import {PagedResult} from "../../../shared/utility/dtos/PagedResult";

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private patchCommentUrl = `${environment.apiUrl}/comment`;
  private apiUrl = `${environment.apiUrl}`;
  private commentAddedSubject = new Subject<CommentDto>();

  private httpClient = inject(HttpClient);

  patchComment(picId: string, data: CommentDto): Observable<CommentDto> {
    return this.httpClient
      .patch<CommentDto>(
        `${this.patchCommentUrl}/${picId}`,
        data,
        { responseType: "json"}
      );
  } // todo: update homePage
  deleteComment(commId: string): Observable<null> {
    return this.httpClient
      .delete<null>(
        `${this.patchCommentUrl}/${commId}`,
        { responseType: "json"}
      );
  }

  addComment(picId: string, data: CommentDto): Observable<CommentDto> {
    return this.httpClient
      .post<CommentDto>(
        `${this.apiUrl}/picture/${picId}/comment`,
        data,
        { responseType: "json"}
      )
      .pipe(tap((res: CommentDto) => this.commentAddedSubject.next(res)));
  }

  getCommentsForPicture(picId: string, pageSize = 3, pageNumber = 2): Observable<PagedResult<CommentDto>> {
    return this.httpClient
      .get<PagedResult<CommentDto>>(
        `${this.apiUrl}/picture/${picId}/comment?pageSize=${pageSize}&pageNumber=${pageNumber}`,
        { responseType: "json"}
      );
  }

  get addedComment$(): Observable<CommentDto> {
    return this.commentAddedSubject.asObservable();
  }

}
