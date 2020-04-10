import { Component, OnInit } from '@angular/core';
import {ProductService} from '../services/product.service'
import { UserService, UserDetails} from '../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor(private productService: ProductService,private userService: UserService, private router: Router) { }

  products = [];
  productsCarouselItem = [];
  productsFilter: any = { name: '' };
  p: number = 1;

  

  ngOnInit() {
    this.getProducts();
    //this.getProfile();
  }

  getProducts(){
    this.productService.getProducts().subscribe((response) => {
      this.products = response;
      this.productsCarouselItem = response;
      console.log(this.products)
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
          // this.router.navigateByUrl('/login');
        }
      )


  }

}
