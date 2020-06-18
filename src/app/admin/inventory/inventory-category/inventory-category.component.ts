import { Component, OnInit ,ViewChild} from '@angular/core';
import {UserService, UserDetails} from '../../../services/user.service';
import {ProductService} from '../../../services/product.service'
import {CategoryService} from '../../../services/category.service'
import {Router} from '@angular/router';

import {Category} from '../../../models/category';

// import {ProductDialog} from './product-dialog';
import { NgxImgZoomService } from 'ngx-img-zoom';

import {SelectionModel} from '@angular/cdk/collections';

import {CategoryDialog} from './category-dialog';

import {MatDialog,MatDialogConfig} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormControl} from '@angular/forms';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource,MatPaginator} from '@angular/material';
import {PageEvent} from '@angular/material/paginator';


import {CategorytDialogCreate} from './category-dialog-create';


@Component({
  selector: 'app-inventory-category',
  templateUrl: './inventory-category.component.html',
  styleUrls: ['./inventory-category.component.scss']
})
export class InventoryCategoryComponent implements OnInit {

  constructor(private ngxImgZoom: NgxImgZoomService,
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

    this.categoryService.getCategories().subscribe((response) => {
      this.categories = response;
      this.dataSource = new MatTableDataSource(response);

      console.log(response);

      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.loading = false;
    })
  }

  archive(element){

    // if(confirm("Are you sure you want to archive this record?")==true){

    //     this.categoryService.archiveCategory(element).subscribe((response)=>{
    //       this.openSnackBar("category move to archive",'dismis');
    //       this.getCategories();
    //     })

    // }

    alert("Write permisson is not allowed");

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

    openCategoryDialogCreate() {



  const dialogConfig = new MatDialogConfig();

    dialogConfig.height = 'auto';
    dialogConfig.width = '400px';
    dialogConfig.position = {
      'top': '0',
      'right': '0'
  };


    const dialogRef = this.dialog.open(CategorytDialogCreate,dialogConfig);



    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }

   openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

   openCategoryDialog(category) {

    const dialogConfig = new MatDialogConfig();


    dialogConfig.height = '100%';
    dialogConfig.width = '400px';
    dialogConfig.position = {
      'top': '0',
      'right': '0'
    };


    dialogConfig.data = {
        id: 1,
        category_info: category
    };

    const dialogRef = this.dialog.open(CategoryDialog,dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
