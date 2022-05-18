import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MessageService } from 'src/app/public/services/message.service';
import { AdminDataService } from '../../services/admin-data.service';

@Component({
  selector: 'app-mhotels',
  templateUrl: './mhotels.component.html',
  styleUrls: ['./mhotels.component.css']
})
export class MhotelsComponent implements OnInit {
  
  categories: any;
  hotels: any;
  searchTerm:string=""

  constructor(
    private adminDataService: AdminDataService,
    private messageService: MessageService
  ) { }

  newHotelForm = new FormGroup({
    hotelName: new FormControl('', Validators.required),
    hotelCategory: new FormControl('', Validators.required),
    hotelImage:new FormControl('',Validators.required)
  });

  openForm() {
    let newUserForm = document.getElementById("newHotel") as HTMLDivElement || null;
    if (newUserForm != null) {
      newUserForm.style.display = "block"
    }
  }

  closeForm() {
    let newUserForm = document.getElementById("newHotel") as HTMLDivElement || null;
    if (newUserForm != null) {
      this.newHotelForm.reset()
      newUserForm.style.display = "none"
    }
  }

  addNewHotel() {
    const categorySelect = document.getElementById('categoryId') as HTMLSelectElement
    if (categorySelect.selectedIndex != 0) {
    this.adminDataService.addHotel(
        this.newHotelForm.getRawValue().hotelName,
        categorySelect.selectedIndex,
        categorySelect.value,
        this.newHotelForm.getRawValue().hotelImage
      ).subscribe(
        (res) => {
          this.messageService.newHotelAdded();
          this.closeForm()
        },
        (err) => {
          if (err instanceof HttpErrorResponse && err.status == 409){
            return this.messageService.hotelNameAlreadyExists(); 
          }
        }
      )
    }
  }


  editHotel(currentHotelId: any, index: any) {
    
    let hotelNameEditor = document.getElementById(currentHotelId) as HTMLInputElement || null;

    document.getElementsByClassName("saveHotel")[index].setAttribute("style", "display:flex")
    
    document.getElementsByClassName("editHotel")[index].setAttribute("style", "display:none")

    for (let i = 0; i < document.getElementsByClassName("editHotel").length; i++){
      if (i == index) continue;
      else {
        (document.getElementsByClassName("editHotel")[i].children[0] as HTMLButtonElement).disabled = true;
        (document.getElementsByClassName("deleteHotel")[i].children[0] as HTMLButtonElement).disabled = true;
      }
    }
    
    if (hotelNameEditor != null) {

      hotelNameEditor.style.outline = "none"
      hotelNameEditor.style.backgroundColor = "white";

      hotelNameEditor.disabled = false;

      hotelNameEditor.focus()

    } else {
      console.log(null)
    }

  }

  saveHotel(hotelName:string,categoryId:number,categoryType:string,imageRef:any,currentHotelId:any,index:number) {

    let hotelNameEditor = document.getElementById(currentHotelId) as HTMLInputElement || null
    
    if (hotelName != hotelNameEditor.value) {
      if(confirm("Are you sure to update "+hotelName+" to "+hotelNameEditor.value)) {
        this.adminDataService.updateHotelName(currentHotelId,hotelNameEditor.value,categoryId,categoryType,imageRef).subscribe(
          (res) => {
            this.messageService.hotelNameUpdated();
            this.hotels[index].hotelName=hotelNameEditor.value
          }
        )
      } else {
        hotelNameEditor.value=hotelName
      }
    }

    hotelNameEditor.style.outline = "none"
    hotelNameEditor.style.backgroundColor="inherit"

    document.getElementsByClassName("saveHotel")[index].setAttribute("style", "display:none")
    document.getElementsByClassName("editHotel")[index].setAttribute("style", "display:flex")

    for (let i = 0; i < document.getElementsByClassName("editHotel").length; i++){
      if (i == index) continue
      else{
        (document.getElementsByClassName("editHotel")[i].children[0] as HTMLButtonElement).disabled = false;
        (document.getElementsByClassName("deleteHotel")[i].children[0] as HTMLButtonElement).disabled = false;
      }
    }
    
    if (hotelNameEditor != null) {
      hotelNameEditor.disabled = true;
      hotelNameEditor.focus()
    }
    
  }

  deleteHotel(id:number,index: number) {
    if (confirm("Click on 'ok' to confirm your deletion")) {
        this.adminDataService.deleteHotel(id).subscribe(
        (res) => {
          this.messageService.hotelRemoved()
          this.hotels.splice(index,1)
        },
        (err) => {
          this.messageService.failedToRemoveHotel();
        }
      )
    }
  }

  ngOnInit(): void {
    this.adminDataService.fetchCategories().subscribe(
      (res) => {
        this.categories = res
      }
    )

    this.adminDataService.fetchAllHotels().subscribe(
      (res) => {
        this.hotels = res
      }
    )

  }

}
