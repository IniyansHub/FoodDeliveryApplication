import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/auth/auth.service';
import { MessageService } from '../public/services/message.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  constructor(
    private authService : AuthService,
    private messageService : MessageService,
    private router : Router
  ) { }
  
  logout() {
    this.authService.logout()
  this.messageService.logoutSuccess()
  this.router.navigate(["login"])
  }


  ngOnInit(): void {
    
  }

}
