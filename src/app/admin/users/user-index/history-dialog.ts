import { Component,Inject, OnInit ,ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

import {UserService, UserDetails} from '../../../services/user.service';
import {RedeemService} from '../../../services/redeem.service'
import {SaleService} from '../../../services/sale.service'
import {User} from '../../../models/user';


@Component({
    selector: 'history-dialog',
    templateUrl: 'history-dialog.html',
    styleUrls: ['./user-index.component.scss'],
  })
  export class HistoryDialog{


  public userinfo;
  public sales;
  public redeem;


  enableZoom: Boolean = true;
  previewImageSrc = 'pathToImage';
  zoomImageSrc = 'pathToImage';

   constructor(private userServices: UserService, private redeemServices:RedeemService, private saleServices:SaleService,
        private dialogRef: MatDialogRef<HistoryDialog>,
        @Inject(MAT_DIALOG_DATA) data) {

        this.userinfo = data.user;
    }

     public loadingRed = true;
     public loadingHis = true;


    ngOnInit() {
     
     this.getSalesHistory()
     this.getRedeemHistory()

    }


    getSalesHistory(){

      this.sales = [];
      
      this.loadingHis = true;

      this.saleServices.getSale(this.userinfo._id).subscribe((res)=>{
            this.sales = res;

            this.loadingHis = false;
      })

    }

    getRedeemHistory(){

      this.redeem = [];

      this.loadingRed = true;

      this.redeemServices.getRedeem(this.userinfo._id).subscribe((res)=>{
            this.redeem = res;
            this.loadingRed = false;
      })
    }


  }