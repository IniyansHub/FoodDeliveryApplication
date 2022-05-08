import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm = new FormGroup({
    username: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required)
  });

  get username() {
    return this.signupForm.get('username')
  }

  get password() {
    return this.signupForm.get('password')
  }

  signup() {
    this.authService.signupUser(this.signupForm.getRawValue())
      .subscribe((res:any) => {
        localStorage.setItem("access_token", res.access_token)
        localStorage.setItem("refresh_token", res.refresh_token)
        this.router.navigate(['login'])
    })
  }

  constructor(private router:Router, private authService:AuthService) { }

  ngOnInit(): void {
  }

}
