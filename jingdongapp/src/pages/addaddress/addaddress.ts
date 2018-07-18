import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ToolsProvider } from "../../providers/tools/tools";
import { HttpServiceProvider } from "../../providers/http-service/http-service";

/**
 * Generated class for the AddaddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-addaddress',
  templateUrl: 'addaddress.html',
})
export class AddaddressPage {

  public addressList={
    name:'',
    phone:'',
    address:''
  }



  constructor(public navCtrl: NavController, public navParams: NavParams,public tools:ToolsProvider,public httpService:HttpServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddaddressPage');
  }

  addAddress(){
    if(this.addressList.name!=''||this.addressList.phone!=''||this.addressList.address!=''){
    let userinfo=this.tools.getUserInfo()

    let json={
      uid:userinfo._id,
      salt:userinfo.salt,
      name:this.addressList.name,
      phone:this.addressList.phone,
      address:this.addressList.address
    }
    let sign=this.tools.sign(json);

    var api='api/addAddress';
    this.httpService.doPost(api,{
      uid:userinfo._id,
      sign:sign,
      name:this.addressList.name,
      phone:this.addressList.phone,
      address:this.addressList.address

    },(data)=>{
      if(data.success){
        this.navCtrl.pop()
      }else{
        alert(data.message)
      }
    })
  }
  else{
    alert('收货地址不对')
  }
  }

}
