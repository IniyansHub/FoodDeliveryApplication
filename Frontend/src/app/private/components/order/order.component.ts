import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/public/services/message.service';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  locationDetails!: any
  
  parsedObject = JSON.parse('[' + localStorage.getItem("cartItem") + ']');

  cart: any= this.parsedObject[0]!=null?this.parsedObject : []

  totalPrice:number=parseInt(localStorage.getItem("totalPrice") || "0");

  closeForm(location: any) {
    console.log(this.cart)
    this.locationDetails=location
    const closeButton = document.getElementById("location-form") as HTMLSpanElement;

    if (location != null) {
      closeButton.style.display = "none"
      const order = document.getElementById('order-confirm-page') as HTMLDivElement
      order.style.display="block"
    } else {
      this.messageService.provideLocationData()
    }
    
  }

  

  constructor(
    private dataService: DataService,
    private messageService:MessageService
  ) { }

  ngOnInit(): void {
    this.dataService.getLocation()
      .subscribe(
        (res) => {
          this.locationDetails = res
          console.log(this.locationDetails)
      }
    )
  }

}
