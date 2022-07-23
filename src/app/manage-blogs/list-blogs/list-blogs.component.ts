import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Blog } from 'src/app/models/Blog.model';
import { Evaluation } from 'src/app/models/Evaluation.model';
import { ba9ara, User } from 'src/app/models/User.model';
import { BlogService } from 'src/app/services/blog.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-list-blogs',
  templateUrl: './list-blogs.component.html',
  styleUrls: ['./list-blogs.component.css']
})
export class ListBlogsComponent implements OnInit {

  blogs: Blog[];
  search: string = "";
  user:any
  constructor(private blogService: BlogService, private router:Router,
    private userService:UserService) {
    this.user=  JSON.parse(localStorage.getItem('user'));
   }

  ngOnInit(): void {
    this.getBlogs();
  }
  logOut(){
    localStorage.clear();
    this.router.navigate(["/login"]);}
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


  vote(blog:Blog, evall:number) {
    this.userService.getUsersByEvaluation(blog.id,evall).subscribe((data:ba9ara[]) => {
      console.log(data)
      if(!data.includes(this.user)) {
        evall == 1?blog.upvote ++:blog.downvote++;
        this.blogService.updateArticle(blog.id, blog).subscribe();
        const evaluation = new Evaluation();
        evaluation.user_id = this.user.id;
        evaluation.article_id = blog.id;
        evaluation.evaluation = evall;
        this.userService.createEvaluation(evaluation).subscribe();
      }
    })

  }

}
