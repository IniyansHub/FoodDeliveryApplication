import { Component, OnInit } from '@angular/core';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css']
})
export class DishesComponent implements OnInit {

  menus: any;
  cart: any = [];
  totalPrice: number=0;

  
  addFood(foodData: any) {
    this.cart.push(foodData)
    this.totalPrice+=parseInt(foodData.dishPrice)
  }

  removeDish(dishIndex:any) {
    const removedDish = this.cart.splice(dishIndex, 1)
    this.totalPrice-=parseInt(removedDish[0].dishPrice)
  }

  constructor(
    private dataService:DataService
  ) { }

  ngOnInit(): void {

    this.dataService.fetchDishesBasedOnHotelId().subscribe((res) => {
      this.menus = res
    }, (err) => {
      console.log(err)
    })
    
  }

}
