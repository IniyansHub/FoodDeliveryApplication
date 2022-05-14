import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'src/app/public/services/message.service';
import { AdminDataService } from '../../services/admin-data.service';

@Component({
  selector: 'app-m-users',
  templateUrl: './m-users.component.html',
  styleUrls: ['./m-users.component.css']
})
export class MUsersComponent implements OnInit {


  emailEditor = "emailEditor";

  users: any = [];

  constructor(
    private adminDataService: AdminDataService,
    private messageService: MessageService,
    private router:Router
  ) { }

  newUser() {
    console.log("hello")
    this.router.navigate(['signup'])
  }


  editUser(currentUserId: any, index: any) {
    
    let emailEditor = document.getElementById(currentUserId) as HTMLInputElement || null;

    document.getElementsByClassName("saveUser")[index].setAttribute("style", "display:flex")
    
    document.getElementsByClassName("editUser")[index].setAttribute("style", "display:none")

    for (let i = 0; i < document.getElementsByClassName("editUser").length; i++){
      if (i == index) continue;
      else {
        (document.getElementsByClassName("editUser")[i].children[0] as HTMLButtonElement).disabled = true;
        (document.getElementsByClassName("deleteUser")[i].children[0] as HTMLButtonElement).disabled = true;
        (document.getElementsByClassName("markAsAdmin")[i].children[0] as HTMLButtonElement).disabled = true;
      }
    }
    
    if (emailEditor != null) {

      emailEditor.style.outline="1px solid black"

      emailEditor.disabled = false;

      emailEditor.focus()

    } else {
      console.log(null)
    }

  }

  saveUser(username: string, currentUserId: any, index: any,isAdmin:number) {
    
    let emailEditor = document.getElementById(currentUserId) as HTMLInputElement || null

    if (username != emailEditor.value) {
      if(confirm("Are you sure to update "+username+" to "+emailEditor.value)) {
        this.adminDataService.updateUserEmail(currentUserId, emailEditor.value,isAdmin).subscribe(
          (res) => {
            this.messageService.emailUpdated();
          }
        )
      } else {
        emailEditor.value=username
      }
    }

    emailEditor.style.outline="none"

    document.getElementsByClassName("saveUser")[index].setAttribute("style", "display:none")
    
    document.getElementsByClassName("editUser")[index].setAttribute("style", "display:flex")

    for (let i = 0; i < document.getElementsByClassName("editUser").length; i++){
      if (i == index) continue
      else{
        (document.getElementsByClassName("editUser")[i].children[0] as HTMLButtonElement).disabled = false;
        (document.getElementsByClassName("deleteUser")[i].children[0] as HTMLButtonElement).disabled = false;
        (document.getElementsByClassName("markAsAdmin")[i].children[0] as HTMLButtonElement).disabled = false;
      }
    }
    
    if (emailEditor != null) {

      emailEditor.disabled = true;

      emailEditor.focus()

    }
  }

  markAsAdmin(id:number,email:string,index:number) {
    if (confirm("Make this user as Admin")) {
      this.adminDataService.updateUserEmail(id, email, 1).subscribe(
        (res) => {
          this.messageService.promotedToAdmin()
          this.users.splice(index,1)
        },
        (err) => {
          console.log(err)
        }
      )
    }
  }

  deleteUser(id: number, index: number) {
    if (confirm("Click on 'ok' to confirm your deletion")) {
      this.adminDataService.deleteUser(id).subscribe(
        (res) => {
          this.messageService.userRemoved()
          this.users.splice(index,1)
        },
        (err) => {
          this.messageService.failedToRemove();
        }
      )
    }
    
  }

  ngOnInit(): void {
    this.adminDataService.fetchAllUsers().subscribe(
      (res)=>this.users=res
    )
  }

}
