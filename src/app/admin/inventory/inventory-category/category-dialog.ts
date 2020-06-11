import { Component,Inject, OnInit ,ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { NgxImgZoomService } from 'ngx-img-zoom';
import {CategoryService} from '../../../services/category.service'
import {Category} from '../../../models/category';

import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
    selector: 'app-category-dialog',
    templateUrl: 'category-dialog.html',
    styleUrls: ['./inventory-category.component.scss'],
  })
  export class CategoryDialog{

    category:Category;



    loading:Boolean = false;


  enableZoom: Boolean = true;
  previewImageSrc = 'pathToImage';
  zoomImageSrc = 'pathToImage';

    constructor(private ngxImgZoom: NgxImgZoomService,
        private dialogRef: MatDialogRef<CategoryDialog>,
        private categoryService: CategoryService,
        private _snackBar: MatSnackBar,
        @Inject(MAT_DIALOG_DATA) data) {

      

        this.previewImageSrc = 'assets/images/'+data.image;
        this.zoomImageSrc = 'assets/images/'+data.image;
        this.category = data.category_info;
    }


    updateCategory(){

      this.loading = true;

      var edited_category = this.category;

      if(confirm('Are you sure you want to update the category information?')){

        this.categoryService.updateCategory(edited_category).subscribe((response)=>{

          this.loading = false;

          this.openSnackBar('category succesfully updated','dismiss');
          
        })

      }

    }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 1000,
    });
  }



  }