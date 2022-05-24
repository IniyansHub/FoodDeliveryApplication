import {   HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/public/services/message.service';
import { Stripe } from 'stripe';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  locationDetails!: any

  orderId!: number;

  paymentHandler:any = null;
  
  parsedObject = JSON.parse('[' + localStorage.getItem("cartItem") + ']');

  cart: any= this.parsedObject[0]!=null?this.parsedObject : []

  totalPrice: number = parseInt(localStorage.getItem("totalPrice") || "0");
  

  confirmOrder() {
    this.initializePayment(this.totalPrice)
  }

  initializePayment(amount: number) {
    const paymentHandler = (<any>window).StripeCheckout.configure({
      key: 'pk_test_51L33CfSHCMflsPQc6knmp583xj0o1zBYOaXro4JdBXMdAeLwfPEoje7Vy65yNPozGkmlgNIw6ADYKDFhKMQXadvu00cQH5H7FS',
      locale: 'auto',
      token: function (stripeToken: any) {
        routerFunction();
      }
    });
    
    const routerFunction = ()=>{
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

    paymentHandler.open({
      name: 'Foodstocks',
      description: 'OrderId:'+this.orderId,
      amount: amount * 100,
      currency:'inr'
    });
  }

  invokeStripe() {
    if(!window.document.getElementById('stripe-script')) {
      const script = window.document.createElement("script");
      script.id = "stripe-script";
      script.type = "text/javascript";
      script.src = "https://checkout.stripe.com/checkout.js";
      script.onload = () => {
        this.paymentHandler = (<any>window).StripeCheckout.configure({
          key: 'pk_test_51L33CfSHCMflsPQc6knmp583xj0o1zBYOaXro4JdBXMdAeLwfPEoje7Vy65yNPozGkmlgNIw6ADYKDFhKMQXadvu00cQH5H7FS',
          locale: 'auto',
          token: function (stripeToken: any) {
            console.log(stripeToken)
            alert('Payment has been successfull!');
          }
        });
      }
      window.document.body.appendChild(script);
    }
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

    // if(localStorage.getItem('stripeToken')!=null){
    //   localStorage.removeItem('stripeToken')
    //   this.orderPlaced()
    // }

    this.orderId=Math.floor(100000 + Math.random() * 900000);
    this.dataService.getLocation().subscribe(
      (res) => {
        this.locationDetails = res
      }
    )

    this.invokeStripe();
  }

}
