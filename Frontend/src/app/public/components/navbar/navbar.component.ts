import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { MessageService } from '../../services/message.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public authService: AuthService,private router:Router,private messageService:MessageService) { }
  
  logout() {
    this.authService.logout()
    this.messageService.logoutSuccess()
    this.router.navigate(["login"])
    
  }

  ngOnInit(): void {
  }

}
