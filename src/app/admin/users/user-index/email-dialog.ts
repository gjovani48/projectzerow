import { Component,Inject, OnInit ,ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

import {UserService, UserDetails} from '../../../services/user.service';
import {RedeemService} from '../../../services/redeem.service'
import {SaleService} from '../../../services/sale.service'
import {User} from '../../../models/user';


@Component({
    selector: 'email-dialog',
    templateUrl: 'email-dialog.html',
    styleUrls: ['./user-index.component.scss'],
  })
  export class EmailDialog{


  public userinfo;


  enableZoom: Boolean = true;
  previewImageSrc = 'pathToImage';
  zoomImageSrc = 'pathToImage';

    constructor(
        private dialogRef: MatDialogRef<EmailDialog>,
        @Inject(MAT_DIALOG_DATA) data) {

        this.userinfo = data.user;
    }



    ngOnInit() {
     
     

    }


  }