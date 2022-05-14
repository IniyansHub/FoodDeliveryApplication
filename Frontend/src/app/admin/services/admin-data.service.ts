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
    return this.http.put(this.baseUrl+"/updateuser/"+userId,{newEmail:newEmail,isAdmin:isAdmin})
  }

  deleteUser(userId:number) {
    return this.http.delete(this.baseUrl+"/deleteuser/"+userId)
  }

  constructor(
    private http: HttpClient
  ) { }
}
