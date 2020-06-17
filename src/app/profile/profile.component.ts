import { Component, OnInit } from '@angular/core';
import { UserService, UserDetails} from '../services/user.service';
import { SaleService} from '../services/sale.service';
import { RedeemService} from '../services/redeem.service';
import { CategoryService } from '../services/category.service';
import {Router} from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";

import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  details: any;

  userDetail : UserDetails;

  public sales;
  public redeem;
  public loadingRed = true;
  public loadingHis = true;

  newpass = ''; 

  constructor(private _snackBar: MatSnackBar,private saleServices: SaleService,private redeemServices:RedeemService,private userService: UserService,private SpinnerService: NgxSpinnerService) { }

  ngOnInit() {
    this.getProfile();
  }

  getProfile(){
  this.SpinnerService.show(); 
    this.userService.profile().subscribe(
      user=>{
        this.details = user;
        this.userDetail = user;
        this.SpinnerService.hide(); 
        this.getSalesHistory();
        this.getRedeemHistory();
      },
      err=>{
        console.log(err);
      }
    )


  }

  getSalesHistory(){

      this.sales = [];
      
      this.loadingHis = true;

      this.saleServices.getSale(this.details._id).subscribe((res)=>{
            this.sales = res;

            this.loadingHis = false;
      })

    }

    getRedeemHistory(){

      this.redeem = [];

      this.loadingRed = true;

      this.redeemServices.getRedeem(this.details._id).subscribe((res)=>{
            this.redeem = res;
            this.loadingRed = false;
      })
    }

    updateConfig(){

    if(confirm("Are you sure you want to change your login credentials?")==true){

      this.userDetail.password = (this.newpass=='')? this.userDetail.password: this.newpass;

      this.userService.updateUser(this.userDetail).subscribe((res)=>{


        this.openSnackBar("Your Login credentials is now updated",'dismis');
        this.getProfile();


      })


    }


  }

  updateUserInfo(){

    if(confirm("Are you sure you want to update your information?")==true){

      this.userDetail.password = (this.newpass=='')? this.userDetail.password: this.newpass;

      this.userService.updateUserInfo(this.userDetail).subscribe((res)=>{

        this.openSnackBar("Your information is now updated",'dismis');
        this.getProfile();

      })


    }


  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  url;

  onSelectFile(event) {
      if (event.target.files && event.target.files[0]) {
        var reader = new FileReader();

        reader.readAsDataURL(event.target.files[0]); // read file as data url

        reader.onload = (event) => { // called once readAsDataURL is completed
          this.url = reader.result;
        }
      }
  }

}
