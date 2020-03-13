import { Component, OnInit } from '@angular/core';
import { UserService, UserDetails} from '../services/user.service';
import { CategoryService } from '../services/category.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  details: UserDetails;

  categories = [];



  constructor(private userService: UserService,private categoryService: CategoryService,private router: Router) { }

  ngOnInit() {
    //user profile
    this.getProfile();
    this.getCategories();
  }


  getCategories(){
      this.categoryService.getCategories().subscribe(category=>{
          this.categories = category;
          console.log(this.categories);
      },
      err=>{
        console.log(err);
      })
  }

  getProductList(category){
    this.router.navigate(['/products/',category._id]);
  }

  getProfile(){
      this.userService.profile().subscribe(
        user=>{
          this.details = user;

          console.log(this.details);
        },
        err=>{
          console.log(err);
        }
      )


  }

}
