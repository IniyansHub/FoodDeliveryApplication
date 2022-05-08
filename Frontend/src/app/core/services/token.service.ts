import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  getAccessToken() {
    return localStorage.getItem("access_token")
  }

  saveAccessToken(access_token:string) {
    localStorage.setItem("access_token", access_token)
  }

  getRefreshToken() {
    return localStorage.getItem("refresh_token")
  }

  saveRefreshToken(refresh_token:string) {
    localStorage.setItem("refresh_token",refresh_token)
  }



  constructor() { }
}
