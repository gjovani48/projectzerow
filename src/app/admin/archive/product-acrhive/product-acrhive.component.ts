import { Component, OnInit ,ViewChild} from '@angular/core';
import { UserService, UserDetails} from '../../../services/user.service';
import {ProductService} from '../../../services/product.service'
import {CategoryService} from '../../../services/category.service'
import {Router} from '@angular/router';
import {Product} from '../../../models/product';

import {SelectionModel} from '@angular/cdk/collections';

import {MatDialog,MatDialogConfig} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormControl} from '@angular/forms';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource,MatPaginator} from '@angular/material';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-product-acrhive',
  templateUrl: './product-acrhive.component.html',
  styleUrls: ['./product-acrhive.component.scss']
})
export class ProductAcrhiveComponent implements OnInit {

    constructor(private _snackBar: MatSnackBar,private userService: UserService,
              private router: Router,private productService: ProductService, 
              private categoryService: CategoryService,public dialog: MatDialog) { }

  isAdmin : boolean;
  products = [];

  public isMarked:Boolean=true;

  public dataSource = new MatTableDataSource<Product>();

  public selection = new SelectionModel<Product>(true, []);

  public loading = true;

  displayedColumns: string[] = ['select','No.','image','name', 'price','quantity','action'];
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator,{static: true}) paginator: MatPaginator;

ngOnInit() {

	this.getProfile();
	this.getProducts();

}

getProducts(){

    this.products = [];
    this.loading = true;

    this.productService.getArchProducts().subscribe((response) => {
      
      this.products = response;

      this.dataSource = new MatTableDataSource(this.products);

      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;

      this.loading = false;

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
checkboxLabel(row?: Product): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row._id}`;
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

}
