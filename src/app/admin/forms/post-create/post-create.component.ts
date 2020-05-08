import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
// import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.scss']
})
export class PostCreateComponent implements OnInit {

	// public Editor = ClassicEditor;
	public model = {
        editorData: '<p>Hello, world!</p>'
    };

  constructor(private loc: Location) { }

  ngOnInit() {
    
  }

}
