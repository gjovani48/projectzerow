import {Component, OnInit, ViewChild,ChangeDetectorRef} from '@angular/core';
import { Observable } from 'rxjs';
import {UserService, UserDetails} from '../../../services/user.service';
import {ProductService} from '../../../services/product.service'
import {CategoryService} from '../../../services/category.service'
import {SaleService} from '../../../services/sale.service'
import {Router} from '@angular/router';
import {Sale} from '../../../models/sale';
import {Product} from '../../../models/product';


import {SelectionModel} from '@angular/cdk/collections';

import {MatDialog,MatDialogConfig} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormControl} from '@angular/forms';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource,MatPaginator} from '@angular/material';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-sales-acrhive',
  templateUrl: './sales-acrhive.component.html',
  styleUrls: ['./sales-acrhive.component.scss']
})

export class SalesAcrhiveComponent implements OnInit {

  Math: any;

   constructor(private _snackBar: MatSnackBar,private userService: UserService,private saleServices: SaleService,
              private router: Router,private productService: ProductService, 
              private categoryService: CategoryService,public dialog: MatDialog,private changeDetectorRef: ChangeDetectorRef) { 

             this.Math = Math;
   }

 public isMarked:Boolean=true;

 public sales = [];

 public totalSale = [];

 public dataSource = new MatTableDataSource<Sale>();

 public selection = new SelectionModel<Sale>(true, []);

 displayedColumns: string[] = ['select','No.','user_id','item', 'total','amount_due','change','sale_date','action'];
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

 	this.saleServices.getArcSales().subscribe((res)=>{

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

  unarchiveSale(sale){

   if(confirm("Are you sure you want to restore this record?")==true){

     this.saleServices.unarchiveSale(sale).subscribe((res)=>{

       this.openSnackBar("Sale restore",'dismis');

       this.getSales();

     })

     
   }


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
  checkboxLabel(row?: Sale): string {
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

 // openSalesDialog(sales) {

 //    const dialogConfig = new MatDialogConfig();

 //    dialogConfig.width = "450px"

 //    dialogConfig.position = {
 //      'top': "30px;"
 //    }

 //    dialogConfig.data = {
 //        sales_info: sales
 //    };

 //    const dialogRef = this.dialog.open(SalesDialog,dialogConfig);

 //    dialogRef.afterClosed().subscribe(result => {
 //      console.log(`Dialog result: ${result}`);
 //    });
 //  }



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
