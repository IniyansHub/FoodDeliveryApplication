import {   HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/public/services/message.service';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  locationDetails!: any

  orderId!: number;
  
  parsedObject = JSON.parse('[' + localStorage.getItem("cartItem") + ']');

  cart: any= this.parsedObject[0]!=null?this.parsedObject : []

  totalPrice: number = parseInt(localStorage.getItem("totalPrice") || "0");
  

  confirmOrder() {
    this.dataService.addOrder(
      this.orderId,
      this.locationDetails.mobileNumber,
      this.locationDetails.address,
      localStorage.getItem('cartItem') || "",
      this.totalPrice
    ).subscribe(
      (res) => {
          localStorage.removeItem('cartItem');
          localStorage.removeItem('totalPrice');
          this.messageService.orderPlaced()
          this.router.navigate(['private/category'])
      },
      (err) => {
          this.messageService.orderUnsuccessfull()
          this.router.navigate(['private/menus'])
      }
    )
    
  }

  cancel() {
    if (confirm("Are your sure to cancel the ordering process?")) {
      localStorage.removeItem('cartItem');
      localStorage.removeItem('totalPrice');
      this.router.navigate(['private/menus'])
    }
    
  }
  

  constructor(
    private dataService: DataService,
    private messageService: MessageService,
    private router:Router
  ) { }

  ngOnInit(): void {
    this.orderId=Math.floor(100000 + Math.random() * 900000);
    this.dataService.getLocation().subscribe(
      (res) => {
        this.locationDetails = res
      }
    )
  }

}
