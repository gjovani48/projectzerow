import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import {Post} from '../../../models/post';
import {PostService} from '../../../services/post.service'

// import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {

	// public Editor = ClassicEditor;
	public post_article = {
        author: '',
        title: '',
        brief_description: '',
        body: '<p>Create new article</p>',
        image: '',
        media_url: ''
    };

  toolbar = [
    { name: 'document', items: [ 'Source', '-', 'Save', 'NewPage', 'Preview', 'Print', '-', 'Templates' ] },
    { name: 'clipboard', items: [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteFromWord', '-', 'Undo', 'Redo' ] },
    { name: 'editing', items: [ 'Find', 'Replace', '-', 'SelectAll', '-', 'Scayt' ] },
    { name: 'forms', items: [ 'Form', 'Checkbox', 'Radio', 'TextField', 'Textarea', 'Select', 'Button', 'ImageButton', 'HiddenField' ] },
    '/',
    { name: 'basicstyles', items: [ 'Bold', 'Italic', 'Underline', 'Strike', 'Subscript', 'Superscript', '-', 'CopyFormatting', 'RemoveFormat' ] },
    { name: 'paragraph', items: [ 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', '-', 'Blockquote', 'CreateDiv', '-', 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'BidiLtr', 'BidiRtl', 'Language' ] },
    { name: 'links', items: [ 'Link', 'Unlink', 'Anchor' ] },
    { name: 'insert', items: [ 'Image', 'Flash', 'Table', 'HorizontalRule', 'Smiley', 'SpecialChar', 'PageBreak', 'Iframe' ] },
    '/',
    { name: 'styles', items: [ 'Styles', 'Format', 'Font', 'FontSize' ] },
    { name: 'colors', items: [ 'TextColor', 'BGColor' ] },
    { name: 'tools', items: [ 'Maximize', 'ShowBlocks' ] },
    { name: 'about', items: [ 'About' ] }
  ];

  constructor(private loc: Location,private postServices:PostService, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  createpost(){

      // this.postServices.addPost(this.post_article).subscribe((res)=>{

      //   this.openSnackBar(res.msg,'dismis');

      // })

      alert("Write permisson is not allowed");


  }

}
