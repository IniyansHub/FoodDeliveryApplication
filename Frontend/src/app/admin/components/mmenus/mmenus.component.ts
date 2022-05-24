import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ɵflushModuleScopingQueueAsMuchAsPossible } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MessageService } from 'src/app/public/services/message.service';
import { AdminDataService } from '../../services/admin-data.service';

@Component({
  selector: 'app-mmenus',
  templateUrl: './mmenus.component.html',
  styleUrls: ['./mmenus.component.css']
})
export class MmenusComponent implements OnInit {

  constructor(
    private adminDataService: AdminDataService,
    private messageService: MessageService
  ) { }

  menus: any;
  hotels: any;
  searchTerm:string=""

  menuFormData = new FormGroup({
    dishName: new FormControl('', Validators.required),
    dishPrice: new FormControl('', Validators.required),
    hotelId:new FormControl('',Validators.required)
  });

  onHotelSelect(event:any) {
    this.adminDataService.fetchMenusBasedOnHotelId(event.target.value).subscribe(
      (res) => {
        this.menus = res
      }
    )
  }

  openForm() {
    let newMenuForm = document.getElementById("newMenu") as HTMLDivElement || null;
    if (newMenuForm != null) {
      newMenuForm.style.display = "block"
    }
  }

  closeForm() {
    let newMenuForm = document.getElementById("newMenu") as HTMLDivElement || null;
    if (newMenuForm != null) {
      newMenuForm.style.display = "none"
    }
  }

  addNewMenu() {
    const id = parseInt(this.menuFormData.getRawValue().hotelId)
    const dish = this.menuFormData.getRawValue().dishName
    const price = parseInt(this.menuFormData.getRawValue().dishPrice)
    this.adminDataService.addMenuToTheHotelBasedOnHotelId(id, dish, price)
      .subscribe(
        (res) => {
          this.messageService.menuAddedSuccessfully();
          this.closeForm()
        },
        (err) => {
          if (err.status == 400) {
            this.messageService.provideAllDetails()
          } else if (err.status == 409) {
            this.messageService.menuNameExistsAlready()
          } else {
            this.messageService.unableToCreateMenu()
          }
        }
    )
  }

  editMenu(currentMenuId:any,index:any) {
    let dishNameEditor = document.getElementById(currentMenuId) as HTMLInputElement || null;
    let dishPriceEditor =  document.getElementById(""+currentMenuId*0.5) as HTMLInputElement || null

    document.getElementsByClassName("saveHotel")[index].setAttribute("style", "display:flex")
    
    document.getElementsByClassName("editHotel")[index].setAttribute("style", "display:none")

    for (let i = 0; i < document.getElementsByClassName("editHotel").length; i++){
      if (i == index) continue;
      else {
        (document.getElementsByClassName("editHotel")[i].children[0] as HTMLButtonElement).disabled = true;
        (document.getElementsByClassName("deleteHotel")[i].children[0] as HTMLButtonElement).disabled = true;
      }
    }
    
    if (dishNameEditor != null && dishPriceEditor!=null) {

      dishNameEditor.style.outline = "none"
      dishPriceEditor.style.outline="none"
      dishNameEditor.style.backgroundColor = "#d7dae0";
      dishPriceEditor.style.backgroundColor = "#d7dae0";
      dishNameEditor.disabled = false;
      dishNameEditor.focus()
      dishPriceEditor.disabled = false;
      dishPriceEditor.focus()

    } else {
      console.log(null)
    }

  }

  saveMenu(currentMenuId:any,dishName:string,dishPrice:number,index:number) {
    let dishNameEditor = document.getElementById(currentMenuId) as HTMLInputElement || null;
    let dishPriceEditor = document.getElementById("" + currentMenuId * 0.5) as HTMLInputElement || null;

    if (dishNameEditor.value != dishName || parseInt(dishPriceEditor.value) != dishPrice) {
      if (confirm("Are you sure to update the menu data ")) {
        this.adminDataService.updateRestaurantMenuBasedOnMenuId(currentMenuId, dishNameEditor.value, parseInt(dishPriceEditor.value))
          .subscribe(
            (res) => {
              this.messageService.menuUpdatedSuccessfully();
              this.menus[index].dishes = dishNameEditor.value
              this.menus[index].price = dishPriceEditor.value
            },
            (err)=> {
              this.messageService.failedToUpdateMenu()
          }
        )
      } else {
        dishNameEditor.value = dishName
        dishPriceEditor.value =dishPrice.toString()
      }
    }

    document.getElementsByClassName("saveHotel")[index].setAttribute("style", "display:none")
    
    document.getElementsByClassName("editHotel")[index].setAttribute("style", "display:flex")

    for (let i = 0; i < document.getElementsByClassName("editHotel").length; i++){
      if (i == index) continue;
      else {
        (document.getElementsByClassName("editHotel")[i].children[0] as HTMLButtonElement).disabled = false;
        (document.getElementsByClassName("deleteHotel")[i].children[0] as HTMLButtonElement).disabled = false;
      }
    }

    dishNameEditor.style.outline = "none"
    dishNameEditor.style.backgroundColor = "inherit"
    dishNameEditor.disabled = true
    dishNameEditor.focus()
    dishPriceEditor.style.outline = "none"
    dishPriceEditor.style.backgroundColor = "inherit"
    dishPriceEditor.disabled = true
    dishPriceEditor.focus()
  }

  deleteMenu(id:number,index:number) {
    this.adminDataService.deleteMenuBasedOnMenuId(id)
      .subscribe(
        (res) => {
          if (confirm("Click on 'OK' to confirm your deletion")) {
            this.messageService.menuRemovedSuccessfully();
            this.menus.splice(index,1)
          } 
         },
        (err) => { 
          this.messageService.failedToRemove()
        }
    )
  }



  ngOnInit(): void {
    this.adminDataService.fetchAllHotels().subscribe(
      (res)=>{this.hotels=res}
    )
  }

}
