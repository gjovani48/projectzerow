import { Component, OnInit ,ViewChild} from '@angular/core';
import { UserService, UserDetails} from '../../../services/user.service';
import {ProductService} from '../../../services/product.service'
import {CategoryService} from '../../../services/category.service'
import {Router} from '@angular/router';
import {Product} from '../../../models/product';

import {ProductDialog} from './product-dialog';
import {ProductDialogCreate} from './product-dialog-create';
import { NgxImgZoomService } from 'ngx-img-zoom';


import {MatDialog,MatDialogConfig} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormControl} from '@angular/forms';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource,MatPaginator} from '@angular/material';
import {PageEvent} from '@angular/material/paginator';


@Component({
  selector: 'app-inventory-products',
  templateUrl: './inventory-products.component.html',
  styleUrls: ['./inventory-products.component.scss']
})

export class InventoryProductsComponent implements OnInit {  

  category = new FormControl();
  categoryList = [];

  public gridView = false;
  public listView = true;
  public loading = true;

  displayedColumns: string[] = ['No.','image','name', 'price','quantity','action'];
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


  public quantity_list = [];
  public price_list = [];
  public total_quantity:number;
  public total_price:number;

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

    this.products = [];
    this.loading = true;

    this.productService.getProducts().subscribe((response) => {
      this.products = response;
      this.productsCarouselItem = response;

      response.forEach((item,index)=>{

        this.quantity_list.push(item.quantity);
        this.price_list.push(parseFloat(item.price.toString())*parseFloat(item.quantity.toString()));

      }) 

      

      console.log(this.quantity_list);


      this.dataSource = new MatTableDataSource(this.products);

      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

      this.loading = false;

    })
  }

  totalQty(a,b){
    return a+b;
  }

  totalPrice(a,b){
    return a+b;
  }

  openProductDialog(product) {

    const dialogConfig = new MatDialogConfig();


    dialogConfig.height = '85%';
    dialogConfig.width = '400px';
    dialogConfig.position = {
      'top': '0',
      'right': '0'
    };


    dialogConfig.data = {
        id: 1,
        product_info: product
    };

    const dialogRef = this.dialog.open(ProductDialog,dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

   openProductDialogCreate() {



    const dialogConfig = new MatDialogConfig();

    dialogConfig.height = '100%';
    dialogConfig.width = '400px';
    dialogConfig.position = {
      'top': '0',
      'right': '0'
  };


    const dialogRef = this.dialog.open(ProductDialogCreate,dialogConfig);



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
        console.log(this.categoryList)
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

  archive(element){

    this.productService.archiveProduct(element).subscribe((response)=>{
      this.openSnackBar("Product move to archive",'dismis');
      this.getProducts();
    })

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
