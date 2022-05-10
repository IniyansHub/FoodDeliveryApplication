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
      "categoryDescription": `American cuisine is generally a type of fusion cuisine which assimilates flavors from the 
      melting pot of traditional American cooking techniques mixed with foreign and sometimes molecular gastronomy components. 
      New American cuisine features innovative use of seasoning and sauces.`
    },
    {
      "categoryId": 3,
      "categoryName": "Chinese",
      "image1": "../../../../assets/images/chinese-category1.jpg",
      "image2": "../../../../assets/images/chinese-category2.jpg",
      "image3": "../../../../assets/images/chinese-category3.jpg",
      "categoryDescription": `Color, scent and taste are the three traditional aspects used to describe Chinese food,
       as well as the meaning, appearance, and nutrition of the food. Cooking should be appraised with respect to the 
       ingredients used, knifework, cooking time, and seasoning.`
    },
    {
      "categoryId": 4,
      "categoryName": "Arabian",
      "image1": "../../../../assets/images/arabian-category1.jpg",
      "image2": "../../../../assets/images/arabian-category2.jpg",
      "image3": "../../../../assets/images/arabian-category3.jpg",
      "categoryDescription": `The essential concept in the Arabic cuisine is hospitality. Formal dinners and celebrations 
      normally include large quantities of lamb (or veal), chicken, rice, stewed vegetables with tomato sauce and dishes 
      seasoned with a variety of herbs and spices. Several other side dishes and salads are included.`
    },
    {
      "categoryId": 5,
      "categoryName": "Italian",
      "image1": "../../../../assets/images/italian-category.jpg",
      "image2": "../../../../assets/images/italian-category2.jpg",
      "image3": "../../../../assets/images/italian-category3.jpg",
      "categoryDescription": `Italian cuisine has a great variety of different ingredients which are commonly used, ranging from 
      fruits, vegetables, grains, cheeses, meats and fish. In the North of Italy, fish (such as cod, or baccalà), potatoes, rice, 
      corn (maize), sausages, pork, and different types of cheese are the most common ingredients.`
    }
  ]


  sendCategory(categoryId:any){
    console.log(categoryId)
  }


  constructor(private authService:AuthService) { }

  ngOnInit(): void {
    this.authService.authorizeUser().subscribe()
  }

}
