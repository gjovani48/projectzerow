import { Component, OnInit ,ViewChild} from '@angular/core';
import {UserService, UserDetails} from '../../../services/user.service';
import {ProductService} from '../../../services/product.service'
import {CategoryService} from '../../../services/category.service'
import {Router} from '@angular/router';

import {Category} from '../../../models/category';


import {SelectionModel} from '@angular/cdk/collections';


import {MatDialog,MatDialogConfig} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormControl} from '@angular/forms';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource,MatPaginator} from '@angular/material';
import {PageEvent} from '@angular/material/paginator';
;


@Component({
  selector: 'app-category-acrhive',
  templateUrl: './category-acrhive.component.html',
  styleUrls: ['./category-acrhive.component.scss']
})
export class CategoryAcrhiveComponent implements OnInit {

  constructor(
              private _snackBar: MatSnackBar,private userService: UserService,
              private router: Router,private productService: ProductService, 
              private categoryService: CategoryService,public dialog: MatDialog) { }

   categories = [];
   public isMarked:Boolean=true;
   
   public dataSource = new MatTableDataSource<Category>();

   public selection = new SelectionModel<Category>(true, []);

   public loading = true;

  displayedColumns: string[] = ['select','No.','image','name','blnk','action'];
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator,{static: true}) paginator: MatPaginator;

  ngOnInit() {
  	this.getCategories();
  }


  getCategories(){
    this.categories = [];
    this.loading = true;

    this.categoryService.getCategoriesArc().subscribe((response) => {
      this.categories = response;
      this.dataSource = new MatTableDataSource(response);

      console.log(response);

      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.loading = false;
    })
  }

  unarchive(element){

    this.categoryService.unarchiveCategory(element).subscribe((response)=>{
      this.openSnackBar("category restore",'dismis');
      this.getCategories();
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
  checkboxLabel(row?: Category): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row._id}`;
  }

  applyFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }


   openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
