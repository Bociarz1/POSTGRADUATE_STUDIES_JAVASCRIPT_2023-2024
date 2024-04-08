import {inject, Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {
  ICheckAuthTokenRequest,
  ICheckAuthTokenResponse,
  IGetScoresResponse,
  IPostScoresRequest
} from "../interfaces/api-response.interface";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {API_URLS} from "../consts/url.const";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private http: HttpClient = inject(HttpClient);

  private createHeader(authToken?: string): HttpHeaders {
    return new HttpHeaders({
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      ...(authToken ? {'auth-token': authToken || ''} : {})
    });
  }

  public checkAuthToken(payload: ICheckAuthTokenRequest): Observable<ICheckAuthTokenResponse> {
    return this.http.post<ICheckAuthTokenResponse>(API_URLS.CHECK_AUTH__POST, payload)
  }

  public getScores(): Observable<IGetScoresResponse[]> {
    return this.http.get<IGetScoresResponse[]>(API_URLS.GET_SCORES__GET, {headers: this.createHeader()})
  }

  public addScore(payload: IPostScoresRequest): Observable<IGetScoresResponse[]> {
    const {authToken} = payload || {}
    return this.http.post<IGetScoresResponse[]>(API_URLS.SET_SCORE__POST, payload, {headers: this.createHeader(authToken)})
  }
}
