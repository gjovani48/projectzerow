import { Component,Inject, OnInit ,ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { NgxImgZoomService } from 'ngx-img-zoom';
import {ProductService} from '../../../services/product.service'
import {Sale} from '../../../models/sale';

@Component({
    selector: 'sales-dialog',
    templateUrl: 'sales-dialog.html',
    styleUrls: ['./sales.component.scss'],
  })
  export class SalesDialog{

    sales:Sale;

    constructor(private ngxImgZoom: NgxImgZoomService,
        private dialogRef: MatDialogRef<SalesDialog>,
        private productService: ProductService,
        @Inject(MAT_DIALOG_DATA) data) {

        this.sales = data.sales_info;
    }



  }