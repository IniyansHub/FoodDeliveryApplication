import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpClient
} from '@angular/common/http';

import { catchError, Observable, switchMap, throwError } from 'rxjs';
import { TokenService } from '../services/token.service';
import { AuthService } from '../auth/auth.service';


@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  refreshed: boolean = false;
  refreshReq: boolean = false;

  constructor(
    private http: HttpClient,
    private tokenService: TokenService,
    private authService:AuthService
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let req;

    if (this.refreshReq) {
      req = request.clone({
        setHeaders: {
          Authorization: "Bearer "+this.tokenService.getRefreshToken()
        }
      })
      this.refreshReq = false;
    } else {
      req = request.clone({
        setHeaders: {
          Authorization: "Bearer "+this.tokenService.getAccessToken()
        }
      })
    }
      return next.handle(req).pipe(catchError((err: HttpErrorResponse) => {
        if (err && err.status == 401 && !this.refreshed) {
          this.refreshed = true;
          this.refreshReq = true;
          return this.http.post('http://localhost:3000/api/token', "").pipe(
            switchMap((res: any) => {
              this.tokenService.saveAccessToken(res.access_token)
              return next.handle(request.clone({
                setHeaders: {
                  Authorization: "Bearer " + this.tokenService.getAccessToken()
                }
              }));
            })
          ).pipe(catchError((err: HttpErrorResponse) => {
            if (err && err.status == 401) {
              this.authService.normalLogout()
            }
            return throwError(() => err);
          }))
        }
        this.refreshed = false;
        return throwError(() => err);
      
      }));

    
  }
}

