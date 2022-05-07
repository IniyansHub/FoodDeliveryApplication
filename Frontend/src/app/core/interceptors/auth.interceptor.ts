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
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  refreshed: boolean = false;
  refreshReq: boolean = false;

  constructor(private http:HttpClient,private router:Router) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let req;

    if (this.refreshReq) {
      req= request.clone({
        setHeaders: {
          Authorization:`Bearer ${localStorage.getItem("refresh_token")}`
        }
      })
    } else {
      console.log("inside normal response section")
      req= request.clone({
        setHeaders: {
          Authorization:`Bearer ${localStorage.getItem("access_token")}`
        }
      })
    }
    
    return next.handle(req).pipe(catchError((err:HttpErrorResponse) => {
      if (err && err.status == 401 && !this.refreshed) {
        this.refreshed = true;
        this.refreshReq = true;
        console.log("inside refreshing section")
        return this.http.post('http://localhost:3000/api/token',"").pipe(
          switchMap((res: any) => {
            localStorage.setItem("access_token", res.access_token)
            return next.handle(request.clone({
              setHeaders: {
                Authorization: `Bearer ${localStorage.getItem("access_token")}`
              }
            }));
          })
        ).pipe(catchError((err: HttpErrorResponse) => {
          this.router.navigate([''])
          return throwError(()=>err);
        }))
      }

      this.refreshReq = true;
      this.refreshed = false;
      return throwError(()=>err);
      
    }));
    
  }
}

