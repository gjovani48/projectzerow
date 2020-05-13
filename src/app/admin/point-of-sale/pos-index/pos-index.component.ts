import { Component, OnInit ,ViewChild} from '@angular/core';
import {UserService, UserDetails} from '../../../services/user.service';
import {ProductService} from '../../../services/product.service'
import {CategoryService} from '../../../services/category.service'
import {Router} from '@angular/router';

// import {ProductDialog} from './product-dialog';
import { NgxImgZoomService } from 'ngx-img-zoom';


import {MatDialog,MatDialogConfig} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormControl} from '@angular/forms';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource,MatPaginator} from '@angular/material';
import {PageEvent} from '@angular/material/paginator';
@Component({
  selector: 'app-pos-index',
  templateUrl: './pos-index.component.html',
  styleUrls: ['./pos-index.component.scss']
})
export class PosIndexComponent implements OnInit {

    constructor(private ngxImgZoom: NgxImgZoomService,
              private _snackBar: MatSnackBar,private userService: UserService,
              private router: Router,private productService: ProductService, 
              private categoryService: CategoryService,public dialog: MatDialog) { }

  categories = [];
  public dataSource;


  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator,{static: true}) paginator: MatPaginator;

  ngOnInit() {

  	this.getCategories();
  }


 public categoryProducts = [];


 getCategories(){
    this.categoryService.getCategories().subscribe((response) => {
      this.categories = response;
      this.dataSource = new MatTableDataSource(response);

      console.log(response);

      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    })
  }

  getProductsList(product){

  	alert('fuck')

  	this.categoryService.getProductList(product.id).subscribe(res=>{
          this.categoryProducts = res;
          console.log(product)
      },
      err=>{
        console.log(err);
      })

  }
}
