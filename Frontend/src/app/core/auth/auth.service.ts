import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/public/services/message.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseUrl = 'http://localhost:3000/api/';

  authorizeUser() {
    return this.http.get(`${this.baseUrl}authorize`)
  }

  loginUser(userdata: any) {
    return this.http.post(`${this.baseUrl}login`, userdata)
  }

  signupUser(userdata: any) {
    return this.http.post(`${this.baseUrl}signup`,userdata)
  }

  logout():boolean {
    this.http.delete(`${this.baseUrl}logout`)
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

  constructor(private http:HttpClient,private router:Router,private messageService:MessageService) { }
}
