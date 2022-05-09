import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categories = [
    {
      "categoryId": 1,
      "categoryName": "Indian",
      "image1": "../../../../assets/images/indian-category.jpg",
      "image2": "../../../../assets/images/indian-category2.jpg",
      "image3": "../../../../assets/images/indian-category3.jpg",
      "categoryDescription": `Spicy, rich, flavourful and diverse are terms that are frequently used to 
      describe Indian food.All these words are apt in describing Indian cuisine, for it is diverse in variety 
      and taste, and is made up from a wide array of regional cuisines throughout various parts of India.`
    },
    {
      "categoryId": 2,
      "categoryName": "American",
      "image1": "../../../../assets/images/american-category1.jpg",
      "image2": "../../../../assets/images/american-category2.jpg",
      "image3": "../../../../assets/images/american-category3.jpg",
      "categoryDescription": `Spicy, rich, flavourful and diverse are terms that are frequently used to 
      describe Indian food.All these words are apt in describing Indian cuisine, for it is diverse in variety 
      and taste, and is made up from a wide array of regional cuisines throughout various parts of India.`
    },
    {
      "categoryId": 3,
      "categoryName": "Chinese",
      "image1": "../../../../assets/images/chinese-category1.jpg",
      "image2": "../../../../assets/images/chinese-category2.jpg",
      "image3": "../../../../assets/images/chinese-category3.jpg",
      "categoryDescription": `Spicy, rich, flavourful and diverse are terms that are frequently used to 
      describe Indian food.All these words are apt in describing Indian cuisine, for it is diverse in variety 
      and taste, and is made up from a wide array of regional cuisines throughout various parts of India.`
    },
    {
      "categoryId": 4,
      "categoryName": "Arabian",
      "image1": "../../../../assets/images/arabian-category1.jpg",
      "image2": "../../../../assets/images/arabian-category2.jpg",
      "image3": "../../../../assets/images/arabian-category3.jpg",
      "categoryDescription": `Spicy, rich, flavourful and diverse are terms that are frequently used to 
      describe Indian food.All these words are apt in describing Indian cuisine, for it is diverse in variety 
      and taste, and is made up from a wide array of regional cuisines throughout various parts of India.`
    },
    {
      "categoryId": 5,
      "categoryName": "Italian",
      "image1": "../../../../assets/images/italian-category.jpg",
      "image2": "../../../../assets/images/italian-category2.jpg",
      "image3": "../../../../assets/images/italian-category3.jpg",
      "categoryDescription": `Spicy, rich, flavourful and diverse are terms that are frequently used to 
      describe Indian food.All these words are apt in describing Indian cuisine, for it is diverse in variety 
      and taste, and is made up from a wide array of regional cuisines throughout various parts of India.`
    }
  ]

  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.authService.authorizeUser().subscribe()
  }

}
