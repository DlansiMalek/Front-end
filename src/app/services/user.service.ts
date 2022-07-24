import { HttpClient } from "@angular/common/http";
import { Container } from "@angular/compiler/src/i18n/i18n_ast";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { Evaluation } from "../models/Evaluation.model";
import { User } from "../models/User.model";

@Injectable({
    providedIn: 'root'
  })
export class UserService{
    baseUrl: string = environment.base2Url;
    constructor(private http:HttpClient){}
    login(user:User){
        return this.http.post(this.baseUrl+"login",user);
    }
    register(user:User){
        return this.http.post(this.baseUrl+"register",user);
    }

    getUsersByEvaluation(article_id:number, evall:number) {
        return this.http.get(this.baseUrl+"getListEvaluation.php?article_id="+article_id+"&eval="+evall);
    }
    createEvaluation(evaluation:Evaluation){
        return this.http.post(this.baseUrl+"createEvaluation.php",evaluation);
    }
    

}
