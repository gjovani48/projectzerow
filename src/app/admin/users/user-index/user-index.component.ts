import {Component, OnInit, ViewChild,ChangeDetectorRef} from '@angular/core';
import { Observable } from 'rxjs';
import {UserService, UserDetails} from '../../../services/user.service';
import {ProductService} from '../../../services/product.service'
import {RedeemService} from '../../../services/redeem.service'
import {CategoryService} from '../../../services/category.service'
import {SaleService} from '../../../services/sale.service'
import {Router} from '@angular/router';
import {Sale} from '../../../models/sale';
import {User} from '../../../models/user';
import {Redeem} from '../../../models/redeem';
import {Product} from '../../../models/product';


import {SelectionModel} from '@angular/cdk/collections';


import {MatDialog,MatDialogConfig} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {FormControl} from '@angular/forms';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource,MatPaginator} from '@angular/material';
import {PageEvent} from '@angular/material/paginator';


import {UserInformationDialog} from './information-dialog';
import {EmailDialog} from './email-dialog';
import {HistoryDialog} from './history-dialog';

@Component({
  selector: 'app-user-index',
  templateUrl: './user-index.component.html',
  styleUrls: ['./user-index.component.scss']
})
export class UserIndexComponent implements OnInit {


public users:User[];
public isMarked:Boolean=true;

 constructor(
              private _snackBar: MatSnackBar,private userServices: UserService,private saleServices: SaleService,
              private router: Router,private productService: ProductService, private redeemServices: RedeemService,
              private categoryService: CategoryService,public dialog: MatDialog,private changeDetectorRef: ChangeDetectorRef) { }

public dataSource = new MatTableDataSource<User>();

public selection = new SelectionModel<User>(true, []);

 displayedColumns: string[] = ['select','No.','firstname','lastname','phone', 'email','pzwpoints','Action'];
 length = 100;
 pageSize = 10;
 pageSizeOptions: number[] = [5, 10, 25, 100];

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator,{static: true}) paginator: MatPaginator;


  ngOnInit() {
  	this.getUsers();
  }


  getUsers(){

  	this.userServices.getUsers().subscribe((res)=>{

  		this.users = res;

  		this.dataSource = new MatTableDataSource(this.users);

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
  checkboxLabel(row?: User): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row._id}`;
  }

  applyFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

  openEmailDialog(user){

  	const dialogConfig = new MatDialogConfig();

	    dialogConfig.height = 'auto';
	    dialogConfig.width = '400px';
	    
	    dialogConfig.data = {
	        user: user
    	};

    	dialogConfig.height = 'auto';
	    dialogConfig.width = '500px';

	     dialogConfig.position = {
		    'top': '20px'
		};


    const dialogRef = this.dialog.open(EmailDialog,dialogConfig);



    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }

  openInformationDialog(user){
  	

    const dialogConfig = new MatDialogConfig();

	    dialogConfig.height = '85%';
      dialogConfig.width = '400px';
      dialogConfig.position = {

        'top': '0',
        'right': '0'
        
      };
	    
	    dialogConfig.data = {
	        user: user
    	};


    const dialogRef = this.dialog.open(UserInformationDialog,dialogConfig);



    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openHistoryDialog(user){

  	const dialogConfig = new MatDialogConfig();

	    dialogConfig.height = 'auto';
	    dialogConfig.width = '70%';

	     dialogConfig.position = {
		    'top': '30px'
		};
	    
	    dialogConfig.data = {
	        user: user
    	};


    const dialogRef = this.dialog.open(HistoryDialog,dialogConfig);



    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  	
  }

}
