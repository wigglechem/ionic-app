import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SearchPage } from "../search/search";
import { ConfigProvider } from "../../providers/config/config";
import {  Http,Jsonp } from "@angular/http";
import { HttpServiceProvider } from "../../providers/http-service/http-service";
import { PcontentPage } from "../../pages/pcontent/pcontent";
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  
  public PcontentPage=PcontentPage;

  public focusList=[];

  public bestList=[];

  public bestListWidth='';

  public hotList=[];

  constructor(public navCtrl: NavController,public config:ConfigProvider,public jsonp:Jsonp,public http:Http,public httpService:HttpServiceProvider) {
    
    
    //console.log(this.config);
    //this.config.run();

   this.getFocus();
   this.getBestProduct();
   this.getHotProduct();
    
   

    
  }
  goSearch(){
    this.navCtrl.push(SearchPage);
  }
  //轮播图方法
  getFocus(){

    var that=this;

    this.httpService.requestData('api/focus',function(data){
      //console.log(data);
      that.focusList=data.result;
      
    })
  }


  getBestProduct(){
    this.httpService.requestData('api/plist?is_best=1',(data)=> {
      //console.log(data);
      this.bestList = data.result;
       this.bestListWidth=this.bestList.length*92 +'px';

    })
  }

  getHotProduct(){
    this.httpService.requestData('api/plist?is_hot=1',(data)=>{
      this.hotList=data.result;
      

        
    })



  }


}
