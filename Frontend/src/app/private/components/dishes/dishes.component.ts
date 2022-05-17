import { Component, OnInit } from '@angular/core';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.css']
})
export class DishesComponent implements OnInit {

  menus: any;

  parsedObject = JSON.parse('[' + localStorage.getItem("cartItem") + ']');

  cart: any= this.parsedObject[0]!=null?this.parsedObject : []

  totalPrice:number=parseInt(localStorage.getItem("totalPrice") || "0");

  addFood(foodData: any) {
    this.cart.push(foodData)
    if (localStorage.getItem("cartItem") == null) {
      localStorage.setItem("cartItem", `{"dishName":"${foodData.dishName}","dishPrice":"${foodData.dishPrice}"}`)
      this.totalPrice+=foodData.dishPrice
      localStorage.setItem("totalPrice", ""+this.totalPrice)
    } else {
      localStorage.setItem("cartItem",localStorage.getItem("cartItem")+","+`{"dishName":"${foodData.dishName}","dishPrice":"${foodData.dishPrice}"}`)
      this.totalPrice+=parseInt(foodData.dishPrice)
      localStorage.setItem("totalPrice",""+this.totalPrice)
    }
    
  }

  placeOrder() {
    console.log("working!")
  }

  removeDish(dishIndex: any) {

    let allObject = JSON.parse('[' + localStorage.getItem("cartItem") + ']');//[{}]

    allObject.splice(dishIndex, 1);

    localStorage.removeItem("cartItem");

    const removedDish = this.cart.splice(dishIndex, 1);

    console.log(removedDish[0].dishPrice)

    allObject.forEach((element:any) => {
      if (localStorage.getItem("cartItem") == null) {
        localStorage.setItem("cartItem", `{"dishName":"${element.dishName}","dishPrice":"${element.dishPrice}"}`)
      } else {
        localStorage.setItem("cartItem",localStorage.getItem("cartItem")+","+`{"dishName":"${element.dishName}","dishPrice":"${element.dishPrice}"}`)
      }

  });
    

    this.totalPrice -= parseInt(removedDish[0].dishPrice)

    localStorage.setItem("totalPrice",""+this.totalPrice)



  }

  constructor(
    private dataService:DataService
  ) { }

  ngOnInit(): void {
    console.log(this.parsedObject)
    console.log(this.cart)
    this.dataService.fetchDishesBasedOnHotelId().subscribe((res) => {
      this.menus = res
    })
    
  }

}
