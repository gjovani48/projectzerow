import {Component, OnInit, ViewChild,ChangeDetectorRef} from '@angular/core';
import { Observable } from 'rxjs';
import {UserService, UserDetails} from '../../../services/user.service';
import {ProductService} from '../../../services/product.service'
import {CategoryService} from '../../../services/category.service'
import {SaleService} from '../../../services/sale.service'
import {Router} from '@angular/router';
import {Sale} from '../../../models/sale';
import {Product} from '../../../models/product';



import {SalesDialog} from './sales-dialog';

// import {ProductDialog} from './product-dialog';
import { NgxImgZoomService } from 'ngx-img-zoom';

import {MatDialog,MatDialogConfig} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormControl} from '@angular/forms';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource,MatPaginator} from '@angular/material';
import {PageEvent} from '@angular/material/paginator';


@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss']
})
export class SalesComponent implements OnInit {

   constructor(private _snackBar: MatSnackBar,private userService: UserService,private saleServices: SaleService,
              private router: Router,private productService: ProductService, 
              private categoryService: CategoryService,public dialog: MatDialog,private changeDetectorRef: ChangeDetectorRef) { }

 public sales = [];
 public totalSale = [];
 public dataSource;

 displayedColumns: string[] = ['No.','user_id','item', 'total','amount_due','change','sale_date','action'];
 length = 100;
 pageSize = 10;
 pageSizeOptions: number[] = [5, 10, 25, 100];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator,{static: true}) paginator: MatPaginator;

 ngOnInit() {
 	this.getSales();
 }

 printThis(){
 	window.print();
 }


 public anonymousSale = [];

 getSales(){

 	this.saleServices.getSales().subscribe((res)=>{

 		res.forEach((row)=>{
 			this.totalSale.push(row.total);

       if(row.user_id == null){
         this.anonymousSale.push(row);
       }

 		})
		
		this.sales = res;

		this.dataSource = new MatTableDataSource(this.sales);

    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;

 	})


 }

 applyFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

 totalAll(a,b){

 	return a+b;

 }

 openSalesDialog(sales) {

    const dialogConfig = new MatDialogConfig();

    dialogConfig.width = "450px"

    dialogConfig.position = {
      'top': "30px;"
    }

    dialogConfig.data = {
        sales_info: sales
    };

    const dialogRef = this.dialog.open(SalesDialog,dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }





}
