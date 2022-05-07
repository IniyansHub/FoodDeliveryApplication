import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private http: HttpClient,
    private router: Router,
    private apiService:ApiService
    
  ) { }

  loginform = new FormGroup({
    username: new FormControl('',Validators.required),
    password: new FormControl('',Validators.required)
  });

  get username() {
    return this.loginform.get('username')
  }

  get password() {
    return this.loginform.get('password')
  }

  

  login() {
    this.apiService.logginUser(this.loginform.getRawValue())
      .subscribe((res:any) => {
        localStorage.setItem("access_token", res.access_token)
        localStorage.setItem("refresh_token", res.refresh_token)
        this.router.navigate(['location'])
    })
  }

  ngOnInit(): void {
    
    

  }

}
