import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, ParamMap} from '@angular/router';
import { UserService, UserDetails} from '../services/user.service';
import { CategoryService } from '../services/category.service';
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.scss']
})
export class ProductlistComponent implements OnInit {

  details: UserDetails;

  products = [];
  categoryId;
  category;

  productsFilter: any = { name: '' };
  p: number = 1;

  constructor(private userService: UserService,private categoryService: CategoryService,private router: Router,private route:ActivatedRoute,private SpinnerService: NgxSpinnerService) { }

  ngOnInit() {
    this.getProductList();
    // this.getProfile();
  }

  getProductList(){

    this.SpinnerService.show();  

    this.route.paramMap.subscribe((params:ParamMap)=>{
      let id = params.get('id');
      this.categoryId = id;
    });


    this.categoryService.getProductList(this.categoryId).subscribe(product=>{
          this.products = product;

        this.categoryService.getCategory(this.categoryId).subscribe(res=>{
            this.category = res;
            this.SpinnerService.hide();  
        },
        err=>{
          console.log(err);
        })


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
        // this.router.navigateByUrl('/login');
      }
    )


}

}
