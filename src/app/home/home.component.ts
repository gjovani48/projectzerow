import { Component, OnInit } from '@angular/core';
import { UserService, UserDetails} from '../services/user.service';
import { CategoryService } from '../services/category.service';
import { MessegeService } from '../services/messege.service';
import {Router} from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

import { Message } from '../models/message'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  details: UserDetails;

  categories = [];


  public subs_name = "";
  public subs_email = "";
  public subs_msg = "";



  constructor(private userService: UserService,private categoryService: CategoryService,
    private router: Router,private SpinnerService: NgxSpinnerService,
    private messageServices: MessegeService) { }

  ngOnInit() {
    //user profile
    //this.getProfile();
    this.getCategories();
  }


  getCategories(){
    this.SpinnerService.show();  
      this.categoryService.getCategories().subscribe(category=>{
          this.categories = category;
          console.log(this.categories);
          this.SpinnerService.hide();
      },
      err=>{
        console.log(err);
      })
  }

  getProductList(category){
    this.router.navigate(['/products/',category._id]);
  }

  getProfile(){
      this.userService.profile().subscribe(
        user=>{
          this.details = user;

          console.log(this.details);
        },
        err=>{
          console.log(err);
        }
      )


  }

  sendMessage(){

    var msg = new Message();

    msg.name = this.subs_name;
    msg.email = this.subs_email;
    msg.message = this.subs_msg;

    this.messageServices.addMessage(msg).subscribe((res)=>{

      console.log(res);
      alert(res.status);

    })

  }

}
