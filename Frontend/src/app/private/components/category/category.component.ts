import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories!: any;

  sendCategory(categoryId:any){
    localStorage.setItem("categoryId", categoryId);
    this.router.navigate(['private/restaurants'])
  }

  exploreAllCategories() {
    localStorage.removeItem("categoryId");
    this.router.navigate(['private/restaurants'])
  }


  constructor(
    private authService: AuthService,
    private router: Router,
    private dataService:DataService
  ) { }

  ngOnInit(): void {
    this.authService.authorizeUser().subscribe()
    this.dataService.fetchAllCategories().subscribe(
      (res)=>{this.categories=res}
    )
  }

}
