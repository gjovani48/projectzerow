import { Component, OnInit ,ViewChild} from '@angular/core';
import { UserService, UserDetails} from '../../../services/user.service';
import {ProductService} from '../../../services/product.service'
import {CategoryService} from '../../../services/category.service'
import {Router} from '@angular/router';
import {Product} from '../../../models/product';

import {FormBuilder, FormControl, FormGroup,Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';

import {  FileUploader } from 'ng2-file-upload';

//const uploadAPI = 'http://localhost:80/product/upload'; // better use a service class

const uploadAPI = 'https://protected-escarpment-77600.herokuapp.com/product/upload';

@Component({
  selector: 'app-category-create',
  templateUrl: './category-create.component.html',
  styleUrls: ['./category-create.component.scss']
})
export class CategoryCreateComponent implements OnInit {

  constructor(private userService: UserService,
              private router: Router,
              private productService: ProductService, 
              private categoryService: CategoryService,private _snackBar: MatSnackBar){ }

  categoryForm = new FormGroup({
    name : new FormControl(),
    description : new FormControl(),
    image : new FormControl(),
  });

  public uploader: FileUploader = new FileUploader({ url: uploadAPI, itemAlias: 'file' });

   ngOnInit() {
    this.uploader.onAfterAddingFile = (file) => { file.withCredentials = false; };
    this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
          console.log('FileUpload:uploaded successfully:', item, status, response);
          let file_name = JSON.parse(response);

         this.categoryForm.patchValue({
          image: file_name.success.toString(),
        });

        // this.img = file_name.success.toString();

        // console.log(this.img.toString());
    };

    this.getProfile();

  }

  	isAdmin : boolean;

	getProfile(){
	    this.userService.profile().subscribe(
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

addCategory(){
    this.uploader.uploadAll();
    this.categoryService.addCategory(this.categoryForm.value).subscribe((response)=>{
      console.log(this.categoryForm.value)
      this.openSnackBar(response.msg,'dismis');
      console.log(this.categoryForm.value)
    })
  }

 openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

}
