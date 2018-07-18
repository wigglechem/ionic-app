import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { StorageProvider } from '../../providers/storage/storage';
import { ConfigProvider } from "../../providers/config/config";
import { HttpServiceProvider } from "../../providers/http-service/http-service";
import { ToolsProvider } from "../../providers/tools/tools";
import { LoginPage } from "../login/login";
import { AddressPage } from "../address/address";
import { PaymentPage } from "../payment/payment";


/**
 * Generated class for the OrderPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-order',
  templateUrl: 'order.html',
})
export class OrderPage {

  public list=[];

  public userinfo='';

  public LoginPage=LoginPage;

  public address='';

  public allPrice=0;

  public leaveWord='';

  public AddressPage=AddressPage;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storage: StorageProvider,public config:ConfigProvider,public httpService:HttpServiceProvider,public tools:ToolsProvider) {
  

  }
  ionViewWillEnter(){
    this.userinfo=this.tools.getUserInfo();
   this.list=this.storage.get('order_data');
   console.log(this.list);
   if(this.userinfo){
     this.getDefaultAddress();
   }


   if(this.list){
     this.sumPrice();
   }
   
   
   
  }

  ionViewDidEnter() {
  }

  getDefaultAddress(){

    let userinfo:any=this.userinfo;

    let json={
      
      uid:userinfo['_id'],
      salt:userinfo.salt
      
    }
    let sign=this.tools.sign(json);

    let api='api/oneAddressList?uid='+userinfo['_id']+'&sign='+sign;

    this.httpService.requestData(api,(data)=>{
      if(data.success){
        console.log(data.result);
        this.address=data.result[0];
      }else{
        this.address=''

      }
    })
  }

  goPayment(){
    //console.log(this.userinfo);

    //console.log(this.address);

    //console.log(this.list);
    if(!this.userinfo){
      this.navCtrl.push('LoginPage',{
        history:'order'
      })

    }else if(!this.address){

     console.log('您还没有选择收货地址');
     

    }else{

      let userinfo:any=this.userinfo;

      var uid:any=userinfo['_id'];

      var address:any=this.address['address'];

      var phone:any=this.address['phone'];
      var name:any=this.address['name'];
      var all_price=this.allPrice;
      var products:any=JSON.stringify(this.list);
      let json={
        uid:userinfo._id,
        salt:userinfo.salt,
        address:address,
        phone:phone,
        name:name,
        all_price:all_price
      }

      let sign=this.tools.sign(json);

      let api='api/doOrder';

      this.httpService.doPost(api,{
        uid:userinfo._id,
        salt:userinfo.salt,
        address:address,
        phone:phone,
        name:name,
        all_price:all_price,
        sign:sign,
        products:products
      },(data)=>{
        if(data.success){
          this.navCtrl.push(PaymentPage);
          console.log(data);

          

          

        }else{
          console.log(data.message);
          
        }
      })





    }

    
  
  }
  sumPrice(){
    var tempAllPrice = 0;
    for (let i = 0; i < this.list.length; i++) {
      if (this.list[i].checked == true) {
        tempAllPrice += this.list[i].product_count * this.list[i].product_price;
      }
    }
    this.allPrice = tempAllPrice;
  }

}
