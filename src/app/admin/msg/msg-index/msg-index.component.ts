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



  constructor(private router: Router,private userServices: UserService,private messagesServices: MessegeService,private changeDetectorRef: ChangeDetectorRef) { }

  public msg : Messeges[];
  isAdmin : boolean;

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

  	this.messagesServices.getMessages().subscribe((res)=>{

  	  this.msg = res;
      this.dataSource = new MatTableDataSource<Messeges>(this.msg);
      this.changeDetectorRef.detectChanges();
      this.dataSource.paginator = this.paginator;
      this.obs = this.dataSource.connect();

  	})

  }

  openMessage(message){

  	this.messagesServices.openMessage(message).subscribe((res)=>{

  		console.log(res);
  		alert(res);

  	})

  }

   applyFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }

}
