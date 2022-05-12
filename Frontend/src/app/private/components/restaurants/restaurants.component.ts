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
  
  getHotelId(id:string) {
    localStorage.setItem("hotelId", id);
    this.router.navigate(['private/menus'])
    
  }

  
  constructor(
    private dataService: DataService,
    private authService: AuthService,
    private router:Router
  ) { 
    
  }

  ngOnInit(): void {

    this.authService.authorizeUser().subscribe()

    this.dataService.fetchAllHotels().subscribe((res) => {
      this.hotels=res
    })
  }

  

}
