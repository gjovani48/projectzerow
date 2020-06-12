import { Component, OnInit ,ViewChild,ChangeDetectorRef} from '@angular/core';
import {Router} from '@angular/router';
import { PostService } from '../services/post.service';

import { Observable } from 'rxjs';

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
  selector: 'app-web-post',
  templateUrl: './web-post.component.html',
  styleUrls: ['./web-post.component.scss']
})
export class WebPostComponent implements OnInit {

  public post:PostItem[];

  constructor(private postServices: PostService,private changeDetectorRef: ChangeDetectorRef, private router: Router) { }


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




}
