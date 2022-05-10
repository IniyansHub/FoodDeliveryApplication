import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http:HttpClient) { }

  fetchHotelsBasedOnId() {
    const categoryId = localStorage.getItem("categoryId");
    return this.http.get("http://localhost:3000/api/hotel/"+categoryId)
  }

  fetchAllHotels() {
    return this.http.get("http://localhost:3000/api/hotel/");
  }



}
