import { Component, OnInit } from '@angular/core';
import {PostCreateComponent} from '../forms/post-create/post-create.component';
import {ArticleListComponent} from './article-list/article-list.component';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
