import { Component,Inject, OnInit ,ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { NgxImgZoomService } from 'ngx-img-zoom';
import {ProductService} from '../../../services/product.service'
import {Sale} from '../../../models/sale';

@Component({
    selector: 'pos-sales-dialog',
    templateUrl: 'pos-sales-dialog.html',
    styleUrls: ['./pos-index.component.scss'],
  })
  export class PosSalesDialog{

    sales:Sale;
    tr_code;
    client;

    constructor(private ngxImgZoom: NgxImgZoomService,
        private dialogRef: MatDialogRef<PosSalesDialog>,
        private productService: ProductService,
        @Inject(MAT_DIALOG_DATA) data) {

        this.sales = data.sales_info;
        this.client = data.client;
        this.tr_code = data.transaction_code;
    }



  }