import {Component, OnInit, ViewChild,ChangeDetectorRef} from '@angular/core';
import { Observable } from 'rxjs';
import {UserService, UserDetails} from '../../../services/user.service';
import {ProductService} from '../../../services/product.service'
import {CategoryService} from '../../../services/category.service'
import {SaleService} from '../../../services/sale.service'
import {Router} from '@angular/router';
import {Cart} from '../../../models/cart';
import {Product} from '../../../models/product';


// import {ProductDialog} from './product-dialog';
import { NgxImgZoomService } from 'ngx-img-zoom';

import {MatDialog,MatDialogConfig} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormControl} from '@angular/forms';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource,MatPaginator} from '@angular/material';
import {PageEvent} from '@angular/material/paginator';

import {SelectionModel} from '@angular/cdk/collections';

export interface montlysale{
  _id: any
  totalAmount: Number
  count: Number
}

@Component({
  selector: 'app-tmchn-sales',
  templateUrl: './tmchn-sales.component.html',
  styleUrls: ['./tmchn-sales.component.scss']
})
export class TmchnSalesComponent implements OnInit {

  Math: any;
  loading:Boolean = true;

   constructor(private _snackBar: MatSnackBar,private userService: UserService,private saleServices: SaleService,
              private router: Router,private productService: ProductService, 
              private categoryService: CategoryService,public dialog: MatDialog,private changeDetectorRef: ChangeDetectorRef) { 

             this.Math = Math;
   }

 public isMarked:Boolean=true;

 public sales = [];

 public totalSale = [];

 public dataSource = new MatTableDataSource<Cart>();

public selection = new SelectionModel<Cart>(true, []);



 displayedColumns: string[] = ['select','No.','id','user_id','product','total','created_date','action'];

 length = 100;
 pageSize = 10;
 pageSizeOptions: number[] = [5, 10, 25, 100];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator,{static: true}) paginator: MatPaginator;

 ngOnInit() {
 	this.getSales();
 }


 public anonymousSale = [];

 getSales(){

   this.loading = true;

 	this.saleServices.getCartSales().subscribe((res)=>{

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

    this.loading = false;

 	})


 }

 archiveMany(){

   var _ids = [];

   this.selection.selected.forEach((row)=>{

       _ids.push(row._id)

   })

   this.saleServices.archiveMulSale(_ids).subscribe((res)=>{

     console.log(res);

     if(res.status==true){
         alert("sales move to archive")
         this.getSales();
         this.masterToggle();
     }
     else{
       alert("fail");
     }

   })


 }

 isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: Cart): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row._id}`;
  }


 applyFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

 totalAll(a,b){

 	return a+b;

 }



   archiveSale(sale){

   this.saleServices.archiveSale(sale).subscribe((res)=>{

     this.openSnackBar("Sale move to archive",'dismis');

     this.getSales();

   })


 }

 openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }


}
