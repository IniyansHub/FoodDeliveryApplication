import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/auth/auth.service';


@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.css']
})
export class LocationsComponent implements OnInit {

  locations!: any
  
  // addressForm = new FormGroup({
  //   name: new FormControl('',Validators.required),
  //   address1: new FormControl('', Validators.required),
  //   address2: new FormControl('', Validators.required),
  //   city:new FormControl('',Validators.required)
  // });

  fetchLocation() {
    this.http.get("http://localhost:3000/api/getlocation")
      .subscribe((msg) => {
          this.locations=msg
        })
  }

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }
  
  ngOnInit(): void {
    this.authService.authorizeUser().subscribe()
  }
}
