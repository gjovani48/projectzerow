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
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.scss']
})
export class VideosComponent implements OnInit {

  constructor(private postServices: PostService,private changeDetectorRef: ChangeDetectorRef) { }


  public post:PostItem[];
  public video = [];


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

  	 console.log(res)

  	  res.forEach((item,index)=>{

  	  		if(item.media_url){
  	  			this.video.push(item)
  	  		}

  	  })

  	  console.log(this.video)
  	  this.post = this.video;

      this.dataSource = new MatTableDataSource<PostItem>(this.post);
      this.changeDetectorRef.detectChanges();
      this.dataSource.paginator = this.paginator;
      this.obs = this.dataSource.connect();

  	})

  }

  applyFilter(filterValue: string){
    this.dataSource.filter = filterValue.trim().toLocaleLowerCase();
  }
}
