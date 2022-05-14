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

  loginAsAdmin() {
    this.toastr.info("Login as Admin to access the page", undefined, {
      timeOut:3000
    })
  }

  emailExistAlready() {
    this.toastr.error("Email already exisits!", undefined, {
      timeOut:3000
    })
  }

  emailUpdated() {
    this.toastr.success("Email updated successfully", undefined, {
      timeOut:1000
    })
  }

  promotedToAdmin() {
    this.toastr.success("Updation successfull", undefined, {
      timeOut:1000
    })
  }

  userRemoved() {
    this.toastr.success("User removed successfully", undefined, {
      timeOut:1000
    })
  }

  failedToRemove() {
    this.toastr.success("Failed to remove user", undefined, {
      timeOut:1000
    })
  }

}
