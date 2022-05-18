import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  title:string = 'My first AGM project';
  lat = 51.678418;
  long = 7.809007;

  constructor() { }

  ngOnInit(): void {
  }

}
