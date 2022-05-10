import { Component, OnInit } from '@angular/core';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-restaurants',
  templateUrl: './restaurants.component.html',
  styleUrls: ['./restaurants.component.css']
})
export class RestaurantsComponent implements OnInit {

  placeholder = "Search by hotelname or menus";

  hotels!:any;

  constructor(private dataService : DataService) { }

  ngOnInit(): void {
    const fetchAll = localStorage.getItem("categoryId") == "ID" ? true : false;
    if (fetchAll) {
      this.dataService.fetchAllHotels().subscribe((res) => {
        this.hotels = res;
      })
    } else {
      this.dataService.fetchHotelsBasedOnId().subscribe((res) => {
        this.hotels=res
      })
    }
    
  }

  

}
