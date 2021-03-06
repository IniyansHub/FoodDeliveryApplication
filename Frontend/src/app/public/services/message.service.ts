import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr'

@Injectable({
  providedIn: 'root'
})

export class MessageService {

  constructor(private toastr: ToastrService) { }
  
  loginSuccess() {
    this.toastr.success("Logged in successfully")
  }

  logoutSuccess() {
    this.toastr.error("Logged out")
  }

  registerSuccess() {
    this.toastr.success("Registered Successfully")
  }

  normalLogoutMessage() {
    this.toastr.error("Session expired")
  }

  pleaseLoginMessage() {
    this.toastr.info("Please login to access the page")
  }

  pleaseLoginAsAdmin() {
    this.toastr.info("Please login as admin to access the page")
  }

  invalidEmailPasswordMessage() {
    this.toastr.error("Invalid email or password")
  }

  loginAsAdmin() {
    this.toastr.info("Login as Admin to access the page", undefined, {
      timeOut:3000
    })
  }

  emailExistAlready() {
    this.toastr.error("Email already exisits!", undefined, {
      timeOut:3000
    })
  }

  emailUpdated() {
    this.toastr.success("Email updated successfully", undefined, {
      timeOut:1000
    })
  }

  promotedToAdmin() {
    this.toastr.success("New admin addedd Successfully", undefined, {
      timeOut:1000
    })
  }

  userRemoved() {
    this.toastr.success("User removed successfully", undefined, {
      timeOut:1000
    })
  }

  failedToRemove() {
    this.toastr.error("Failed to remove user", undefined, {
      timeOut:1000
    })
  }

  newHotelAdded() {
    this.toastr.success("New Hotel addedd Successfully", undefined, {
      timeOut:1000
    })
  }

  hotelNameUpdated() {
    this.toastr.success("Hotel name updated successfully", undefined, {
      timeOut:1000
    })
  }

  hotelRemoved() {
    this.toastr.success("hotel removed successfully", undefined, {
      timeOut:1000
    })
  }

  failedToRemoveHotel() {
    this.toastr.error("Failed to remove hotel", undefined, {
      timeOut:1000
    })
  }

  hotelNameAlreadyExists() {
    this.toastr.error("Restaurant with this name exists already", undefined, {
      timeOut:2000
    })
  }

  menuAddedSuccessfully() {
    this.toastr.success("Menu created successfully") 
  }

  menuUpdatedSuccessfully() {
    this.toastr.success("Menu updation successfull!", undefined, {
      timeOut:1000
    });
  }

  failedToUpdateMenu() {
    this.toastr.error("Failed to  update menu", undefined, {
      timeOut:1000
    })
  }

  menuRemovedSuccessfully() {
    this.toastr.success("Menu removed successfully")
  }

  menuNameExistsAlready() {
    this.toastr.error("Menu name exists already")
  }

  provideAllDetails() {
    this.toastr.warning("Please provide all the details to create a record")
  }

  unableToCreateMenu() {
    this.toastr.error("Unable to add new menu to your restaurant")
  }

  dishAddedToCart() {
    this.toastr.success("Dish added to the cart", undefined, {
      timeOut:500
    })
  }

  dishRemovedFromCart() {
    this.toastr.warning("Dish removed from the cart", undefined, {
      timeOut:500
    })
  }

  provideLocationData() {
    this.toastr.warning("please provie the location details")
  }

  locationSaved() {
    this.toastr.success("Location saved successfully")
  }

  orderPlaced() {
    this.toastr.success("Order placed successfully")
  }

  orderUnsuccessfull() {
    this.toastr.error("Unable to place order")
  }

}
