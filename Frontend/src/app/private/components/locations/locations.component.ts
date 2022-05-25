
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/public/services/message.service';
import { DataService } from '../../service/data.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {

  location!: any;

  locationType="Add location";
  
  addressForm = new FormGroup({
    mobile: new FormControl('', Validators.required),
    address: new FormControl('', Validators.required),
    landmark:new FormControl('',Validators.required)
  });

  closeform(){
    this.addressForm.enable()
    this.location=null
  }

  addLocation() {
    this.dataService.addLocation(
      this.addressForm.getRawValue().mobile,
      this.addressForm.getRawValue().address,
      this.addressForm.getRawValue().landmark
    ).subscribe(
      (res) => {
        this.messageService.locationSaved()
        this.router.navigate(['private/order'])
        }
    )
  }

  goBack(){
    this.router.navigate(['private/menus'])
  }

  constructor(
    private dataService: DataService,
    private messageService: MessageService,
    private router:Router
  ) { }
  
  ngOnInit(): void {
    this.dataService.getLocation().subscribe(
      (res) => {
        this.location = res
        if (location != null) {
          this.addressForm.disable();
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
