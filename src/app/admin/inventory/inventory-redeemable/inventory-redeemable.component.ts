import { Component, OnInit ,ViewChild} from '@angular/core';
import { UserService, UserDetails} from '../../../services/user.service';
import {ProductService} from '../../../services/product.service'
import {CategoryService} from '../../../services/category.service'
import {Router} from '@angular/router';
import {Product} from '../../../models/product';

import {ProductDialog} from '../inventory-products/product-dialog';
import { NgxImgZoomService } from 'ngx-img-zoom';


import {MatDialog,MatDialogConfig} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormControl} from '@angular/forms';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource,MatPaginator} from '@angular/material';
import {PageEvent} from '@angular/material/paginator';


@Component({
  selector: 'app-inventory-redeemable',
  templateUrl: './inventory-redeemable.component.html',
  styleUrls: ['./inventory-redeemable.component.scss']
})


export class InventoryRedeemableComponent implements OnInit {  

  category = new FormControl();
  categoryList = [];

  public gridView = false;
  public listView = true;

  displayedColumns: string[] = ['No.','image','name', 'required points','quantity','action'];
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  // dtOptions: DataTables.Settings = {};

  constructor(private ngxImgZoom: NgxImgZoomService,
              private _snackBar: MatSnackBar,private userService: UserService,
              private router: Router,private productService: ProductService, 
              private categoryService: CategoryService,public dialog: MatDialog) { }

  isAdmin : boolean;
  products = [];
  productsCarouselItem = [];
  productsFilter: any = { name: ''};
  p: number = 1;

  
  
  //Price Filetr variables
  public priceA: Number = 0;
  public priceB: Number = 0;
  tempProducts = [];

  public dataSource;

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator,{static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.getCategories();
    this.getProducts();
    this.getProfile();
    // this.dtOptions = {
    //   pagingType: 'full_numbers'
    // };

  }

  // MatPaginator Output
  pageEvent: PageEvent;

  getProducts(){
    this.categoryService.getProductList('5e585e3fcbd1ba001710412c').subscribe((response) => {
      this.products = response;
      this.productsCarouselItem = response;

      console.log(response);

      this.dataSource = new MatTableDataSource(this.products);

      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  openProductDialog(product) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = {
        id: 1,
        product_info: product
    };

    const dialogRef = this.dialog.open(ProductDialog,dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  applyFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  getProfile(){
    this.userService.profile().subscribe(
      user=>{
        this.isAdmin = user.is_admin;
        
        if(this.isAdmin!=true){
          this.router.navigateByUrl('/home');
        }
        
      },
      err=>{
        console.log(err);
        // this.router.navigateByUrl('/login');
      }
    )

}

  getCategories(){
    this.categoryService.getCategories().subscribe(
      resonse=>{
        this.categoryList = resonse;
      },
      err=>{
        console.log(err);
      }
    )
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

          this.dataSource = new MatTableDataSource(response);
  
          this.dataSource.sort = this.sort;
          this.dataSource.paginator = this.paginator;
        },
        err=>{
          console.log(err);
        }
      )


    }

    
  }

  deleteProducts(id){

    this.productService.deleteProduct(id).subscribe((response)=>{
      this.openSnackBar(response.msg,'dismis');
    })

  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}