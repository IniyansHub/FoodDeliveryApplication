import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GlobalUrl } from 'src/app/model/global-url';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  baseUrl = GlobalUrl.url;

  constructor(
    private http: HttpClient
  ) { }
  
  fetchAllCategories() {
    return this.http.get(this.baseUrl+"/api/category")
  }

  fetchLocationBasedOnId(id:number) {
    return this.http.get(this.baseUrl+"api/getlocation/"+id)
  }

  fetchHotelsBasedOnId() {
    const categoryId = localStorage.getItem("categoryId");
    return this.http.get(this.baseUrl+"/api/hotel/"+categoryId)
  }

  fetchAllHotels() {
    return this.http.get(this.baseUrl+"/api/hotel/");
  }

  fetchDishesBasedOnHotelId() {
    const hotelId = localStorage.getItem("hotelId");
    return this.http.get(this.baseUrl+"/api/menu/"+hotelId);
  }

  addLocation(mobileNumber:number,address:string,landmark:string){
    return this.http.put(this.baseUrl+"/api/addlocation",{mobile:mobileNumber,address:address,landmark:landmark})
  }

  getLocation() {
    return this.http.get(this.baseUrl+"/api/getlocation")
  }

  closeFormService() {
    
  }

}
