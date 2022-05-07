import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl = 'http://localhost:3000/';

  constructor(private http: HttpClient) { }

  logginUser(userdata:any) {
    return this.http.post(`${this.baseUrl}api/login`,userdata)
  }

  getLocation() {
    return this.http.get(`${this.baseUrl}api/getlocation`)
  }
}
