import {Component, OnInit, ViewChild,ChangeDetectorRef} from '@angular/core';
import { UserService, UserDetails} from '../../../services/user.service';
import { ProductService,} from '../../../services/product.service';
import { CategoryService,} from '../../../services/category.service';
import { SaleService,} from '../../../services/sale.service';
import { MessegeService} from '../../../services/messege.service';
import {Router} from '@angular/router';


import { Observable } from 'rxjs';
import {MatTableDataSource,MatPaginator} from '@angular/material';
import {PageEvent} from "@angular/material";

import {MatDialog,MatDialogConfig} from '@angular/material/dialog';
import {MessageDialog} from './msg-dialog';

 export interface Messeges {
    _id: any
    name: String
    email: String
    message: String
    date_created: Date
	status: Boolean
}

@Component({
  selector: 'app-msg-index',
  templateUrl: './msg-index.component.html',
  styleUrls: ['./msg-index.component.scss']
})
export class MsgIndexComponent implements OnInit {



  constructor(public dialog: MatDialog,private router: Router,private userServices: UserService,private messagesServices: MessegeService,private changeDetectorRef: ChangeDetectorRef) { }

  public msg : Messeges[];
  isAdmin : boolean;

  loading:Boolean = true;

  //Paginator
  public length

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  obs: Observable<any>;
  public dataSource

  ngOnInit() {
  	this.getProfile();
  	this.getMessages();
  }

  getProfile(){
    this.userServices.profile().subscribe(
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

  getMessages(){

    this.loading = true;

  	this.messagesServices.getMessages().subscribe((res)=>{

  	  this.msg = res;
      this.dataSource = new MatTableDataSource<Messeges>(this.msg);
      this.changeDetectorRef.detectChanges();
      this.dataSource.paginator = this.paginator;
      this.obs = this.dataSource.connect();


      this.loading = false;


  	})

  }

  openMessage(message){

  	this.messagesServices.openMessage(message).subscribe((res)=>{

        const dialogConfig = new MatDialogConfig();


        dialogConfig.position = {
          'top': "30px;"
        }

        dialogConfig.height = "400px;"
        dialogConfig.width = "800px;"

        dialogConfig.data = {
            mgs_data:message
        };

        const dialogRef = this.dialog.open(MessageDialog,dialogConfig);

        dialogRef.afterClosed().subscribe(result => {
          this.getMessages();
        });
  		
  		  
      	// this.getMessages();

  	})

  }

   applyFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

}
