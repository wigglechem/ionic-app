import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { OrderPage } from "../order/order";

import { ConfigProvider } from '../../providers/config/config';
import { StorageProvider } from '../../providers/storage/storage';

@Component({
  selector: 'page-cart',
  templateUrl: 'cart.html'
})
export class CartPage {
  public list = [];
  public allPrice=0;

  public isChecked=false;

  public isEdit=false;

  public hasData=true;

  

  constructor(public navCtrl: NavController, public config: ConfigProvider, public storage: StorageProvider) {

  }
  ionViewDidEnter() {
    this.getCartsData();
    if(this.getCheckNum()==this.list.length && this.list.length>0){
     this.isChecked=true;
   }else{
     this.isChecked=false;
   }
  }
  ionViewWillEnter(){
   //this.checkAll();
   
  }

  getCartsData() {
    var cartsData = this.storage.get('carts_data');
    console.log(cartsData);

    if (cartsData && cartsData.length>0) {
      this.list = cartsData;

      this.hasData=true;

    } else {
      this.list = [];

      this.hasData=false;
    }

    this.sumPrice();

  }

  changeCarts(){
    console.log(this.list);

    if(this.getCheckNum()==this.list.length && this.list.length!=0){
      this.isChecked=true;
    }else{
      this.isChecked=false
    }



    this.sumPrice();


    
  }
  sumPrice(){
    var tempAllPrice=0;
    for(let i=0;i<this.list.length;i++){
      if(this.list[i].checked==true){
          tempAllPrice+=this.list[i].product_count*this.list[i].product_price;
      }
    }
    this.allPrice=tempAllPrice;
  }

  decCount(item){
    if(item.product_count>1){
      --item.product_count;
    }
    this.sumPrice();
    
  }

  incCount(item){
    ++item.product_count;
    this.sumPrice()
  }

  ionViewWillLeave(){
   this.storage.set('carts_data',this.list)
  }


  checkAll(){

    if(this.isChecked){

      for(let i=0;i<this.list.length;i++){
        this.list[i].checked=false;
    }
    this.isChecked=false

    }else{

      for(let i=0;i<this.list.length;i++){
        this.list[i].checked=true;
      }
      this.isChecked=true
    }
  }

  getCheckNum(){
    let sum=0;
    for(let i=0;i<this.list.length;i++){
      if(this.list[i].checked==true){
        sum+=1;
      }
    }
    return sum;
  }

  doDelete(){

    var noCheckedArr=[];

    for(var i=0;i<this.list.length;i++){
      if(!this.list[i].checked){
        noCheckedArr.push(this.list[i]);
      }
    }

    this.list=noCheckedArr;
    this.list.length>0?this.hasData=true:this.hasData=false;
    this.storage.set('carts_data',noCheckedArr)


  }






  
  doPay(){
    var tempArr=[];

    for(var i=0;i<this.list.length;i++){
      if(this.list[i].checked){
        tempArr.push(this.list[i]);
      }
    }

    if(tempArr.length>0){
      this.storage.set('order_data',tempArr);
      this.navCtrl.push(OrderPage);
    }else{
      alert('您还没有选中数据！')
    }
    
    


  }

}
