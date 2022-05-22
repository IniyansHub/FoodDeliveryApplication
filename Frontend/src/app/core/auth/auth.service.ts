import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalUrl } from 'src/app/model/global-url';
import { MessageService } from 'src/app/public/services/message.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = GlobalUrl.url;

  authorizeUser() {
    return this.http.get(`${this.baseUrl}/api/authorize`)
  }

  loginUser(userdata: any) {
    return this.http.post(`${this.baseUrl}/api/login`, userdata)
  }

  signupUser(userdata: any) {
    return this.http.post(`${this.baseUrl}/api/signup`,userdata)
  }

  logout():boolean {
    this.http.delete(`${this.baseUrl}/api/logout`)
    localStorage.clear()
    return true
  }

  normalLogout() {
    localStorage.clear()
    this.messageService.normalLogoutMessage()
    this.router.navigate(['login'])
  }

  isUserLoggedIn():boolean{
    return localStorage.getItem("access_token")!=null
  }

  isAdmin(): boolean{
    const isAdmin = localStorage.getItem("isAdmin")=="1"?true:false
    if (isAdmin) {
      return true
    }
    return false
  }

  constructor(private http:HttpClient,private router:Router,private messageService:MessageService) { }
}
