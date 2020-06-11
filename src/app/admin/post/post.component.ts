import { Component, OnInit } from '@angular/core';
import {PostCreateComponent} from '../forms/post-create/post-create.component';
import {ArticleListComponent} from './article-list/article-list.component';
import {VideosComponent} from './videos/videos.component';

import {PostService} from '../../services/post.service';
import {Post} from '../../models/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {

  constructor(private postServices: PostService) { }

  postArticle = [];
  postVeos = [];

  ngOnInit() {

  	this.getContents();
  	
  }

  getContents(){

  	this.postServices.getPosts().subscribe((res)=>{

  		 res.forEach((item,index)=>{

  	  		if(item.media_url){
  	  			this.postVeos.push(item)
  	  		}

  	  })

  		this.postArticle = res;
  	
  	})

  }

}
