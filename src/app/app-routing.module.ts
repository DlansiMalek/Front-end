import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBlogComponent } from './manage-blogs/add-blog/add-blog.component';
import { BlogDetailsComponent } from './manage-blogs/blog-details/blog-details.component';
import { ListBlogsComponent } from './manage-blogs/list-blogs/list-blogs.component';

const routes: Routes = [
  {path:'',component:ListBlogsComponent},
  {path:'blog-details',component:BlogDetailsComponent},
  {path:'add-blog',component:AddBlogComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
