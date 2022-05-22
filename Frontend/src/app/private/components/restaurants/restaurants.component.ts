import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {

  placeholder = "Search for Restaurants";

  hotels!: any;

  searchTerm: string="";
  
  getHotelId(id:string) {
    localStorage.setItem("hotelId", id);
    this.router.navigate(['private/menus'])
    
  }


  
  
  constructor(
    private dataService: DataService,
    private authService: AuthService,
    private router: Router
    
  ) { 
    
  }

  ngOnInit(): void {

    if (localStorage.getItem("categoryId")==null) {
      this.dataService.fetchAllHotels().subscribe((res) => {
        this.hotels=res
      })
    } else {
      this.dataService.fetchHotelsBasedOnId().subscribe((res) => {
        this.hotels=res
      })
    }
    
  }

  

}
