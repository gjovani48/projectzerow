import { Component, OnInit,ChangeDetectorRef,ViewChild } from '@angular/core';
import {ProductService} from '../services/product.service'
import {CategoryService} from '../services/category.service';
import { UserService, UserDetails} from '../services/user.service';
import {Router} from '@angular/router';

import {Product} from '../models/product';


import { Observable } from 'rxjs';
import {MatTableDataSource,MatPaginator} from '@angular/material';
import {PageEvent} from "@angular/material";
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  constructor(private changeDetectorRef: ChangeDetectorRef,private productService: ProductService,private categoryServices: CategoryService,private userService: UserService, private router: Router) { }


  category = new FormControl();
  categoryList = [];

  products = [];
  productsMini = [];
  productsCarouselItem = [];
  productsFilter: any = { name: '' };
  p: number = 1;


  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  obs: Observable<any>;
  public dataSource

  cats = [];

  ngOnInit() {
    this.getProducts();
    this.getCategories();
    this.getCategoriesCount();
    //this.getProfile();
  }

  getCategories(){
    this.categoryServices.getCategories().subscribe(
      resonse=>{
        this.categoryList = resonse;
        console.log(this.categoryList)
      },
      err=>{
        console.log(err);
      }
    )
  }

  getProducts(){
    this.productService.getProducts().subscribe((response) => {
      this.productsMini = response;
      this.products = response;
      this.dataSource = new MatTableDataSource<Product>(this.products);
      this.changeDetectorRef.detectChanges();
      this.dataSource.paginator = this.paginator;
      this.obs = this.dataSource.connect();
    })
  }

  filterCategories(){

    if(!this.category.value){
      this.getProducts();
    }
    else{

      this.productService.getProductsOnCategory(this.category.value).subscribe(
        response=>{
          console.log(response)

          this.products = response;

          this.dataSource = new MatTableDataSource<Product>(this.products);
          this.changeDetectorRef.detectChanges();
          this.dataSource.paginator = this.paginator;
          this.obs = this.dataSource.connect();

        },
        err=>{
          console.log(err);
        }
      )


    }

    
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

   getCategoriesCount(){
    
    this.categoryServices.getCategoryCount().subscribe((response) => {
      console.log(response)
      this.cats = response;
    })
  }

  applyFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  viewProduct(product){
    this.router.navigate(['/products/',product._id]);
  }

}
