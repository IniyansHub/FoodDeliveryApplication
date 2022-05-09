import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr'

@Injectable({
  providedIn: 'root'
})

export class MessageService {

  constructor(private toastr: ToastrService) { }
  
  loginSuccess() {
    this.toastr.success("Logged in successfully")
  }

  logoutSuccess() {
    this.toastr.error("Logged out")
  }

  registerSuccess() {
    this.toastr.success("Registered Successfully")
  }

  normalLogoutMessage() {
    this.toastr.error("Session expired")
  }

  pleaseLoginMessage() {
    this.toastr.info("Please login to access the page")
  }

  invalidEmailPasswordMessage() {
    this.toastr.error("Invalid email or password")
  }

  emailExistAlready() {
    this.toastr.error("Email already exisits!", undefined, {
      timeOut:3000
    })
  }

}
