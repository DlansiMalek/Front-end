import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Blog } from 'src/app/models/Blog.model';
import { BlogService } from 'src/app/services/blog.service';
declare var jQuery:any;

@Component({
  selector: 'app-add-blog',
  templateUrl: './add-blog.component.html',
  styleUrls: ['./add-blog.component.css']
})
export class AddBlogComponent implements OnInit {

  form:any;
  @Input() blog: Blog;
  @Input() update: boolean = false;

  constructor(private blogService:BlogService, private router:Router) {}

  

  ngOnInit(): void {

    this.initializeForm();
  }

  initializeForm() {
    this.form = new FormGroup({
      Title: new FormControl(this.update?this.blog.Title:'',[Validators.required]),
      author: new FormControl(this.update?this.blog.author:'',[Validators.required]),
      content: new FormControl(this.update?this.blog.content:'',[Validators.required]),
      upvote: new FormControl(this.update?this.blog.upvote:0),
      downvote: new FormControl(this.update?this.blog.downvote:0)
    });
  }

  addBlog() {
    this.update ? this.blogService.updateArticle(this.blog.id, this.form.value).subscribe() : this.blogService.addArticle(this.form.value).subscribe();
    this.update?this.removeUpdateModal():this.router.navigate(['']);
    
  }

  removeUpdateModal() {
   window.location.reload();
  }

}
