import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../services/category.service';
import { UserService, UserDetails} from '../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categories = [];

  constructor(private categoryService: CategoryService,private userService: UserService, private router: Router) { }

  ngOnInit() {
    this.getCategories();
    this.getProfile();
  }

  getCategories(){
    this.categoryService.getCategories().subscribe((response) => {
      this.categories = response;
    })
  }

  details: UserDetails;


  getProfile(){
      this.userService.profile().subscribe(
        user=>{
          this.details = user;

          console.log(this.details);
        },
        err=>{
          console.log(err);
          this.router.navigateByUrl('/login');
        }
      )


  }
}
