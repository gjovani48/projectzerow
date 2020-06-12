import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router, ParamMap} from '@angular/router';
import {ProductService} from '../../services/product.service'
import {CategoryService} from '../../services/category.service';
import {Product} from '../../models/product';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.scss']
})
export class ViewProductComponent implements OnInit {

  constructor(private router: Router,private route:ActivatedRoute,private categoryService: CategoryService,private productService: ProductService) { }


  productId;

  products = [];

  cats = [];

  catDetail:any;

  public pruductsDetail:Product;

  ngOnInit() {
  	 this.getProductDetail();
  	 this.getCategoriesCount();
  }


  getProductDetail(){

  	this.route.paramMap.subscribe((params:ParamMap)=>{
      let id = params.get('id');
      this.productId = id;
    });

    this.productService.getProduct(this.productId).subscribe((res)=>{

    	this.pruductsDetail = res;

    	this.catDetail = res.category_id;

    	console.log(this.pruductsDetail);


    	this.getProductList(res.category_id._id);

    })

  }


  getProductList(id){


    this.categoryService.getProductList(id).subscribe(product=>{
          
          this.products = product;

          console.log(this.products);

      },
      err=>{
        console.log(err);
      })
  }

  getCategoriesCount(){
    
    this.categoryService.getCategoryCount().subscribe((response) => {
      console.log(response)
      this.cats = response;
    })
  }

  viewProduct(product){

    this.pruductsDetail = product;

    console.log(product);
  }

}
