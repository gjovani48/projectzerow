import { Component,Inject, OnInit ,ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { NgxImgZoomService } from 'ngx-img-zoom';
import {ProductService} from '../../../services/product.service'
import {Product} from '../../../models/product';

@Component({
  selector: 'product-dialog-create',
  templateUrl: 'product-dialog-create.html',
})
export class ProductDialogCreate {}