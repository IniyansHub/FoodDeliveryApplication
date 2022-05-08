import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { ApiService } from '../../services/api.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm = new FormGroup({
    username: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('', Validators.required),
    confirmPassword:new FormControl('',Validators.required)
  });

  get username() {
    return this.signupForm.get('username')
  }

  get password() {
    return this.signupForm.get('password')
  }

  signup() {
    this.authService.signupUser(this.signupForm.getRawValue())
      .subscribe((res: any) => {
        this.messageService.registerSuccess()
        this.router.navigate(['login'])
      }, (err) => {
        console.log(err)
        if (err instanceof HttpErrorResponse && err.status == 409) {
          this.messageService.emailExistAlready();
        } else {
          this.messageService.invalidEmailPasswordMessage();
        }
      })
  }

  constructor(private router:Router, private authService:AuthService,private messageService:MessageService) { }

  ngOnInit(): void {
  }

}
