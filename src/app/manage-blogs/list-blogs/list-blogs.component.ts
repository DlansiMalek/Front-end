import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Blog } from 'src/app/models/Blog.model';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-list-blogs',
  templateUrl: './list-blogs.component.html',
  styleUrls: ['./list-blogs.component.css']
})
export class ListBlogsComponent implements OnInit {

  blogs: Blog[];
  search: string = "";

  constructor(private blogService: BlogService, private router:Router) { }

  ngOnInit(): void {
    this.getBlogs();
  }

  getBlogs() {
    this.blogService.getArticles().subscribe((data:Blog[]) => {
      this.blogs = data;
      console.log(data);
    })
  }

  redirectToBlogDetail(id:number){
    this.router.navigate(['blog-details'], { queryParams: { id: id } });
  }

  redirectToAddBlog() {
    this.router.navigate(['add-blog']);
  }

  upvote(blog:Blog) {
    blog.upvote ++;
    this.blogService.updateArticle(blog.id, blog).subscribe();
  }

  downvote(blog:Blog) {
    blog.downvote ++;
    this.blogService.updateArticle(blog.id, blog).subscribe();
  }

}
