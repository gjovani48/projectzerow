import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, ParamMap} from '@angular/router';
import { UserService, UserDetails} from '../services/user.service';
import { CategoryService } from '../services/category.service';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.scss']
})
export class ProductlistComponent implements OnInit {

  details: UserDetails;

  products = [];
  categoryId;

  constructor(private userService: UserService,private categoryService: CategoryService,private router: Router,private route:ActivatedRoute) { }

  ngOnInit() {
    this.getProductList();
    this.getProfile();
  }

  getProductList(){
    this.route.paramMap.subscribe((params:ParamMap)=>{
      let id = params.get('id');
      this.categoryId = id;
    });

    this.categoryService.getProductList(this.categoryId).subscribe(product=>{
          this.products = product;
          console.log(this.products);
      },
      err=>{
        console.log(err);
      })
  }

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
