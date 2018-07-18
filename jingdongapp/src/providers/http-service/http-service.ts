//import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http,Jsonp,Headers } from "@angular/http";
import { ConfigProvider } from "../../providers/config/config";

/*
  Generated class for the HttpServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class HttpServiceProvider {
 private headers= new Headers({'Content-Type':'application/json'})
  constructor(public http: Http,public jsonp:Jsonp,public config:ConfigProvider) {
    console.log('Hello HttpServiceProvider Provider');
  }


  requestData(apiUrl,callback){

    if(apiUrl.indexOf('?')==-1){
      var api=this.config.apiUrl+apiUrl+'?callback=JSONP_CALLBACK'
    }else{
      var api=this.config.apiUrl+apiUrl+'&callback=JSONP_CALLBACK'
    }

    this.jsonp.get(api).subscribe(function(data){

      //console.log(data);

      callback(data['_body']); //回调函数

    },function(err){
      console.log(err);
      
    })
  }

    doPost(apiUrl,json,callback){
      var api = this.config.apiUrl+apiUrl
      this.http.post(api,JSON.stringify(json),
                {headers:this.headers})
                .subscribe(function(res){
         callback(res.json())
      })
    }
}
