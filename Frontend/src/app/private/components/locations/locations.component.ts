
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'src/app/public/services/message.service';
import { DataService } from '../../service/data.service';
import { OrderComponent } from '../order/order.component';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {

  location!: any;

  locationType="Add location"
  
  addressForm = new FormGroup({
    mobile: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    landmark:new FormControl('',Validators.required)
  });

  addLocation() {
    this.dataService.addLocation(
      this.addressForm.getRawValue().mobile,
      this.addressForm.getRawValue().address,
      this.addressForm.getRawValue().landmark
    ).subscribe(
      (res) => {
            let orderCmp = new OrderComponent(this.dataService, this.messageService);
            this.messageService.locationSaved()
            orderCmp.closeForm(location)
        }
    )
  }

  constructor(
    private dataService: DataService,
    private messageService:MessageService
  ) { }
  
  ngOnInit(): void {
    this.dataService.getLocation().subscribe(
      (res) => {
        this.location = res
        if (location != null) {
          this.locationType = "Save location"
          this.addressForm.patchValue({
            mobile: this.location.mobileNumber,
            address: this.location.address,
            landmark:this.location.landmark
          },
          )
        }
        
      }
    )
    
  }
}
