import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminDataService {

  baseUrl="http://localhost:3000/admin/"

  fetchAllUsers() {
    return this.http.get(this.baseUrl+"users")
  }

  updateUserEmail(userId:number,newEmail:string,isAdmin:number) {
    return this.http.put(this.baseUrl+"updateuser/"+userId,{newEmail:newEmail,isAdmin:isAdmin})
  }

  deleteUser(userId:number) {
    return this.http.delete(this.baseUrl+"deleteuser/"+userId)
  }

  fetchCategories() {
    return this.http.get(this.baseUrl+"getcategory")
  }

  fetchAllHotels() {
    return this.http.get(this.baseUrl+"hotel")
  }

  addHotel(newHotelName:string,categoryId:number,categoryType:string,imageRef:string) {
    return this.http.put(this.baseUrl + "addhotel", {hotelName:newHotelName,categoryId:categoryId,categoryType:categoryType,imageRef:imageRef})
  }

  updateHotelName(id:number,newHotelName:string,categoryId:number,categoryType:string,imageRef:string) {
    return this.http.put(this.baseUrl + "updatehotel/"+id, {hotelName:newHotelName,categoryId:categoryId,categoryType:categoryType,imageRef:imageRef})
  }

  deleteHotel(id:number) {
    return this.http.delete(this.baseUrl + "deletehotel/" + id);
  }

  constructor(
    private http: HttpClient
  ) { }
}
