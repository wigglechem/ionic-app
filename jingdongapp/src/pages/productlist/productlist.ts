import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpServiceProvider } from "../../providers/http-service/http-service";
import { ConfigProvider } from "../../providers/config/config";


/**
 * Generated class for the ProductlistPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-productlist',
  templateUrl: 'productlist.html',
})
export class ProductlistPage {


public list=[];

public cid='';

public page=1;

  constructor(public navCtrl: NavController, public navParams: NavParams,public httpService:HttpServiceProvider,public config:ConfigProvider) {
    
    this.cid=this.navParams.get('cid');
    this.getProductList('');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProductlistPage');
  }

  getProductList(infiniteScroll){
    var api='api/plist?cid='+this.cid+'&page='+this.page;

    this.httpService.requestData(api,(data)=>{
        //console.log(data);
        this.list=this.list.concat(data.result);

        if(infiniteScroll){

            infiniteScroll.complete();

            if(data.result.length<10){

              infiniteScroll.enable(false);
              
            }

        };
        this.page++;
        
        
    })
  }

  doLoadMore(infiniteScroll){
    this.getProductList(infiniteScroll)
  }

}
