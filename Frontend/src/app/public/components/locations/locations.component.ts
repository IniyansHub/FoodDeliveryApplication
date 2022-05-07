import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {

  locations:any=[]

  constructor(private service:ApiService) { }
  
  fetchLocation() {
    this.service.getLocation()
      .subscribe((res: any) => {
        this.locations=res
        console.log(res[0].location)
    })
  }

  ngOnInit(): void {
    
  }

}
