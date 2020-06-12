import { Component, OnInit } from '@angular/core';
import { UserService, UserDetails} from '../services/user.service';
import { SaleService} from '../services/sale.service';
import { RedeemService} from '../services/redeem.service';
import { CategoryService } from '../services/category.service';
import {Router} from '@angular/router';
import { NgxSpinnerService } from "ngx-spinner";


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  details: any;

  public sales;
  public redeem;
  public loadingRed = true;
  public loadingHis = true;

  constructor(private saleServices: SaleService,private redeemServices:RedeemService,private userService: UserService,private SpinnerService: NgxSpinnerService) { }

  ngOnInit() {
    this.getProfile();
  }

  getProfile(){
  this.SpinnerService.show(); 
    this.userService.profile().subscribe(
      user=>{
        this.details = user;
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

}
