import { Component, OnInit } from '@angular/core';
import {PostService} from '../../../services/post.service';
import {Post} from '../../../models/post';


@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {

  constructor(private postServices: PostService) { }

  public post:Post[];

  ngOnInit() {

  	this.getArticles();
  }


  getArticles(){

  	this.postServices.getPosts().subscribe((res)=>{

  		this.post = res;

      console.log(res)

  	})

  }

}
