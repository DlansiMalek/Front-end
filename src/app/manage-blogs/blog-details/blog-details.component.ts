import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Blog } from 'src/app/models/Blog.model';
import { BlogService } from 'src/app/services/blog.service';

declare var jQuery:any;

@Component({
  selector: 'app-blog-details',
  templateUrl: './blog-details.component.html',
  styleUrls: ['./blog-details.component.css','./../list-blogs/list-blogs.component.css']
})
export class BlogDetailsComponent implements OnInit {

  blog:Blog;
  id:string;

  constructor(private route:ActivatedRoute, private blogService:BlogService, private router:Router) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.id = params['id'];
      console.log(this.id)
    })

    this.getBlog();
  }

  getBlog() {
    this.blogService.getBlog(this.id).subscribe((data: Blog) => {
      this.blog = data;
      console.log(this.blog)
    })
  }

  upvote() {
    this.blog.upvote ++;
    this.blogService.updateBlog(this.id, this.blog).subscribe();
  }

  downvote() {
    this.blog.downvote ++;
    this.blogService.updateBlog(this.id, this.blog).subscribe();
  }

  onUpdate(){
    jQuery('.modal-update-blog').modal('show');
  }

  onDelete() {
    if (confirm("Are you sure to delete this blog !!") == true) {
      this.blogService.deleteBlog(this.blog.id).subscribe();
      this.router.navigate(['']);
    }
  }

}
