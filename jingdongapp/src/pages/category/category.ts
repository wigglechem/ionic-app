import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpServiceProvider } from "../../providers/http-service/http-service";
import { ConfigProvider } from "../../providers/config/config";
import { ProductlistPage } from "../productlist/productlist";
/**
 * Generated class for the CategoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-category',
  templateUrl: 'category.html',
})
export class CategoryPage {

 public leftCate=[];
 
 public rightCate=[];

 public ProductlistPage=ProductlistPage;
  constructor(public navCtrl: NavController, public navParams: NavParams,public config:ConfigProvider,public httpService:HttpServiceProvider) {
    
   



    this.getLeftCateData();
  }

  getLeftCateData(){
    var api='api/pcate'
    this.httpService.requestData(api,(data)=>{
      console.log(data);
      this.leftCate=data.result;

      this.getRightCateData(this.leftCate[0]['_id'])
    })
  }

  getRightCateData(pid){
    var api='api/pcate?pid='+pid;
    this.httpService.requestData(api,(data)=>{
      console.log(data);
      this.rightCate=data.result;
      
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CategoryPage');
  }

}
