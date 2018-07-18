import { Component,ViewChild,ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ConfigProvider } from "../../providers/config/config";
import { HttpServiceProvider } from "../../providers/http-service/http-service";
import { StorageProvider } from "../../providers/storage/storage";
import { CartPage } from "../cart/cart";
/**
 * Generated class for the PcontentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pcontent',
  templateUrl: 'pcontent.html',
})
export class PcontentPage {

  @ViewChild('myattr') myattr:ElementRef;

 public tabs='plist';

 public item=[];

 public num=1;

 public carts_num=1;
 
 public CartPage=CartPage;


  constructor(public navCtrl: NavController, public navParams: NavParams,public config:ConfigProvider,public httpService:HttpServiceProvider,public storage:StorageProvider) {

    this.requestData(this.navParams.data.id);

    this.carts_num=this.getCartsNum();

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PcontentPage');
    this.bindEvent();
  }

  requestData(id){
    var api='api/pcontent?id='+id;
    this.httpService.requestData(api,(data)=>{

      this.item=data.result;


    })
  }

  bindEvent(){
    console.log(this.myattr);

    var attrDom=this.myattr.nativeElement;

    attrDom.onclick=function(e){
      console.log(e.srcElement.nodeName);
      console.log(e.target);
      if (e.srcElement.nodeName=='SPAN') {

        var ele:any=e.target;
        var parentNode=ele.parentNode;
        var children=parentNode.children;
        for(var i =0;i<children.length;i++){
          children[i].className='';
        }
        ele.className='active';
        
      }
      
      
    }
    
  }

  addCart(){
    var product_title=this.item['title'];

    var product_id=this.item['_id'];

    var product_pic=this.item['pic'];

    var product_price=this.item['price'];

    var product_count=this.num;

    var product_attr='';

    

    var activeDom=document.querySelectorAll('#myattr .active');

    for(var i=0;i<activeDom.length;i++){
      product_attr+=activeDom[i].innerHTML;
    }

    

    var json={
      'product_title':product_title,
      'product_id':product_id,
      product_pic,
      product_price,
      product_count,
      product_attr,
      checked:true
    }


    console.log(json);
    var storageData=this.storage.get('carts_data');

    if(storageData){
      if(this.hasData(storageData,json.product_id)){

        for(var i=0;i<storageData.length;i++){
          if(storageData[i].product_id==product_id){
            storageData[i].product_count+=json.product_count;
          }
        }
        
      }else{
        storageData.push(json);
      }

      this.storage.set('carts_data',storageData);
     
      

    }else{
      var tempArr=[];

      tempArr.push(json);

      this.storage.set('carts_data',tempArr);


    }

    this.carts_num+=json.product_count;
    
  }
  

  incNum(){
    this.num+=1;
  }


  decNum(){
    if(this.num>1){
      this.num-=1;
    }
  }

  hasData(storageData,product_id){
    if(storageData){
      for(var i=0;i<storageData.length;i++){

        if(storageData[i].product_id==product_id){
          return true;
        }
      }
    }
    return false;

  }

  //获取购物车数量
  getCartsNum(){
    var num=0;
    
    var storageData=this.storage.get('carts_data');

    if(storageData){

    
    for(var i=0;i<storageData.length;i++){
      num+=storageData[i].product_count;
    }
    }
    return num;


  }


}
