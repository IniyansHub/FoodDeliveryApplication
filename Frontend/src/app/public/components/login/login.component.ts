import { Component, OnInit } from '@angular/core';
import { FormGroup,FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { TokenService } from 'src/app/core/services/token.service';
import { MessageService } from '../../services/message.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthService,
    private tokenService: TokenService,
    private messageService:MessageService
  ) { }

  loginform = new FormGroup({
    username: new FormControl('',[Validators.required,Validators.email]),
    password: new FormControl('',Validators.required)
  });

  get username() {
    return this.loginform.get('username')
  }

  get password() {
    return this.loginform.get('password')
  }

  login() {
    this.authService.loginUser(this.loginform.getRawValue())
      .subscribe((res:any) => {
        this.tokenService.saveAccessToken(res.access_token)
        this.tokenService.saveRefreshToken(res.refresh_token)
        this.messageService.loginSuccess()
        this.router.navigate(['location'])
      }, (err) => {
          this.messageService.invalidEmailPasswordMessage()
      })
  }

  ngOnInit(): void {
    
  }

}
