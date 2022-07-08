import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { Blog } from "../models/Blog.model";
import { environment } from "src/environments/environment";


@Injectable({
    providedIn: 'root'
  })
export class BlogService {

    baseUrl: string = environment.baseUrl;

    constructor(private http:HttpClient) {

    }

    getBlogs(search: string = "") {
        return this.http.get<Blog[]>(this.baseUrl + "blog/?search="+search);
    }

    getBlog(id:string) {
        return this.http.get<Blog>(this.baseUrl + "blog/"+ id);
    }

    addBlog(blog: Blog) {
        return this.http.post(this.baseUrl + "blog",blog);
    }

    updateBlog(id:string, blog:Blog) {
        return this.http.put(this.baseUrl + "blog/" + id, blog);
    }

    deleteBlog(id:string) {
        return this.http.delete(this.baseUrl + "blog/" + id);
    }
}