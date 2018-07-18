import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';



import { ToolsProvider } from '../../providers/tools/tools';


//请求数据

import { HttpServiceProvider } from '../../providers/http-service/http-service';


/**
 * Generated class for the EditaddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-editaddress',
  templateUrl: 'editaddress.html',
})
export class EditaddressPage {

  public addressList: any = []

  constructor(public navCtrl: NavController, public navParams: NavParams, public tools: ToolsProvider, public httpService: HttpServiceProvider) {
    // console.log(this.navParams.get('item'));

  }


  ionViewWillEnter() {
    this.addressList = this.navParams.get('item');

    console.log(this.addressList);
  }


  editAddress() {



    if (this.addressList.name != '' || this.addressList.phone != '' || this.addressList.address != '') {
   
      let unserinfo = this.tools.getUserInfo();


      let json = {
        id: this.addressList._id,    
        uid: unserinfo._id,
        salt: unserinfo.salt,
        name: this.addressList.name,
        phone: this.addressList.phone,
        address: this.addressList.address
      }

      console.log(json);

      let sign = this.tools.sign(json); 
      var api = 'api/editAddress';
      this.httpService.doPost(api, {
        id: this.addressList._id,     
        uid: unserinfo._id,
        sign: sign,
        name: this.addressList.name,
        phone: this.addressList.phone,
        address: this.addressList.address
      }, (data) => {
        // console.log(data); 
        if (data.success) {
          this.navCtrl.pop();
        } else {
          alert(data.message)
        }
      })

    } else {
      alert('收货地址不对');
    }

  }

}
