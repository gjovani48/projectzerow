import {Component, OnInit, ViewChild,ChangeDetectorRef} from '@angular/core';
import { Observable } from 'rxjs';
import {PostService} from '../../../services/post.service';
import {Post} from '../../../models/post';

import {SelectionModel} from '@angular/cdk/collections';

import {MatSort} from '@angular/material/sort';
import {MatTableDataSource,MatPaginator} from '@angular/material';
import {PageEvent} from '@angular/material/paginator';

import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-post-acrhive',
  templateUrl: './post-acrhive.component.html',
  styleUrls: ['./post-acrhive.component.scss']
})
export class PostAcrhiveComponent implements OnInit {

  constructor(private postServices: PostService,private _snackBar: MatSnackBar) { }

  public post = [];

  public isMarked:Boolean=true;

  public dataSource = new MatTableDataSource<Post>();

  public selection = new SelectionModel<Post>(true, []);


  displayedColumns: string[] = ['select','No.','author','title', 'date_posted','action'];

 length = 100;
 pageSize = 10;
 pageSizeOptions: number[] = [5, 10, 25, 100];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator,{static: true}) paginator: MatPaginator;

  ngOnInit() {
  	this.getPost();
  }

  getPost(){

 	this.postServices.getArchPosts().subscribe((res)=>{
		
		this.post = res;

		this.dataSource = new MatTableDataSource(this.post);
    

	    this.dataSource.sort = this.sort;
	    this.dataSource.paginator = this.paginator;

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
  checkboxLabel(row?: Post): string {
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


  unarchivePost(post){

    // if(confirm("Are you sure you want to restore this post?")==true){
    //   this.postServices.unarchivePost(post).subscribe((res)=>{

    //     this.getPost();

    //   })
    // }
  }


}
