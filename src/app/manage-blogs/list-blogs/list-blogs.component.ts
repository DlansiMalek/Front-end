import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Blog } from 'src/app/models/Blog.model';
import { Evaluation } from 'src/app/models/Evaluation.model';
import { Client, User } from 'src/app/models/User.model';
import { BlogService } from 'src/app/services/blog.service';
import { UserService } from 'src/app/services/user.service';
declare var jQuery:any;
@Component({
  selector: 'app-list-blogs',
  templateUrl: './list-blogs.component.html',
  styleUrls: ['./list-blogs.component.css']
})

export class ListBlogsComponent implements OnInit {
  userId:any
  blogs: Blog[];
  searchTerm:any;
  user:any
 
  constructor(private blogService: BlogService, private router:Router,
    private userService:UserService) {
    this.user=  JSON.parse(localStorage.getItem('user'));
   }

  ngOnInit(): void {
   
    if(localStorage.getItem('user') == null) {
      jQuery('.login').modal('show');
    }
    else{
      this.getBlogs();
    }
    let v=localStorage.getItem('user')
    if (v!==null){
    this.user = JSON.parse(v);
    this.userId=this.user.userInfo.id;
    
  }
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
  closeModal(modalClass:string){
  jQuery(modalClass).modal('hide');
  }
  redirectToLogin() {
    this.router.navigate(['login']);
    this.closeModal(".login")
  }
  redirectToAddBlog() {
    this.router.navigate(['add-blog']);
  }


  vote(blog:Blog, evall:number) {
    this.userService.getUsersByEvaluation(blog.id,evall).subscribe((data:Client[]) => {
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
  search(value: string): void {
    this.blogs = this.blogs.filter((val) => val.title.toLowerCase().includes(value));
    if (value.toLowerCase()==""){
      this.getBlogs()
      
    }
  }}
