import {Component, OnInit, ViewChild,ChangeDetectorRef} from '@angular/core';
import { Observable } from 'rxjs';
import { MessegeService} from '../../../services/messege.service';
import {Post} from '../../../models/post';

import {SelectionModel} from '@angular/cdk/collections';

import {MatSort} from '@angular/material/sort';
import {MatTableDataSource,MatPaginator} from '@angular/material';
import {PageEvent} from '@angular/material/paginator';

import {MatSnackBar} from '@angular/material/snack-bar';

 export interface Messeges {
    _id: any
    name: String
    email: String
    message: String
    date_created: Date
	status: Boolean
}

@Component({
  selector: 'app-message-acrhive',
  templateUrl: './message-acrhive.component.html',
  styleUrls: ['./message-acrhive.component.scss']
})

export class MessageAcrhiveComponent implements OnInit {

  constructor(private messageServices: MessegeService,private _snackBar: MatSnackBar) { }

  public msg = [];

  public isMarked:Boolean=true;

  public dataSource = new MatTableDataSource<Messeges>();

  public selection = new SelectionModel<Messeges>(true, []);


  displayedColumns: string[] = ['select','No.','name','email', 'date_created','action'];

 length = 100;
 pageSize = 10;
 pageSizeOptions: number[] = [5, 10, 25, 100];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator,{static: true}) paginator: MatPaginator;

  ngOnInit() {
  	this.getMessages();
  }

  getMessages(){

 	this.messageServices.getArcMessages().subscribe((res)=>{
		
		this.msg = res;

		this.dataSource = new MatTableDataSource(this.msg);
    

	    this.dataSource.sort = this.sort;
	    this.dataSource.paginator = this.paginator;

 	})


 }


 unarchiveMessage(msg){

      if(confirm("Are you sure you want to archive this message?")==true){

        this.messageServices.unarchiveMessage(msg).subscribe((res)=>{

          this.getMessages();

        })

      }

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
  checkboxLabel(row?: Messeges): string {
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
