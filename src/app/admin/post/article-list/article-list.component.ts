import {Component, OnInit, ViewChild,ChangeDetectorRef} from '@angular/core';
import { Observable } from 'rxjs';
import {PostService} from '../../../services/post.service';
import {Post} from '../../../models/post';

import {MatTableDataSource,MatPaginator} from '@angular/material';
import {PageEvent} from "@angular/material";



 export interface PostItem {
    _id: any
    author: String
    title: String
    brief_description: String
    body: String
    image: String
    media_url: String
}


@Component({
  selector: 'app-article-list',
  templateUrl: './article-list.component.html',
  styleUrls: ['./article-list.component.scss']
})
export class ArticleListComponent implements OnInit {

  constructor(private postServices: PostService,private changeDetectorRef: ChangeDetectorRef) { }


  public post:PostItem[];


  //Paginator
  public length

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  obs: Observable<any>;
  public dataSource


  ngOnInit() {

  	this.getArticles();
  }




  getArticles(){

  	this.postServices.getPosts().subscribe((res)=>{

  		this.post = res;
      this.dataSource = new MatTableDataSource<PostItem>(this.post);
      this.changeDetectorRef.detectChanges();
      this.dataSource.paginator = this.paginator;
      this.obs = this.dataSource.connect();

  	})

  }

   applyFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }


  archivePost(post){

    if(confirm("Are you sure you want to archive this post?")==true){
      this.postServices.archivePost(post).subscribe((res)=>{

        this.getArticles();

      })
    }
  }


}
