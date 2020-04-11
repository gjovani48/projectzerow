import { Component, OnInit ,ViewChild} from '@angular/core';
import { UserService, UserDetails} from '../../../services/user.service';
import {ProductService} from '../../../services/product.service'
import {CategoryService} from '../../../services/category.service'
import {Router} from '@angular/router';
import {Product} from '../../../models/product';


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

  displayedColumns: string[] = ['image','name', 'price','action'];
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  // dtOptions: DataTables.Settings = {};

  constructor(private _snackBar: MatSnackBar,private userService: UserService,private router: Router,private productService: ProductService, private categoryService: CategoryService) { }

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
    this.productService.getProducts().subscribe((response) => {
      this.products = response;
      this.productsCarouselItem = response;

      this.dataSource = new MatTableDataSource(this.products);

      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
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
