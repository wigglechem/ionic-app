import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,AlertController } from 'ionic-angular';
import { AddaddressPage } from "../addaddress/addaddress";
import { ToolsProvider } from "../../providers/tools/tools";
import { HttpServiceProvider } from "../../providers/http-service/http-service";
import { EditaddressPage } from "../editaddress/editaddress";
/**
 * Generated class for the AddressPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-address',
  templateUrl: 'address.html',
})
export class AddressPage {

  public list=[];

  public AddaddressPage=AddaddressPage;

  public userinfo='';



  constructor(public navCtrl: NavController, public navParams: NavParams,public tools:ToolsProvider,public httpService:HttpServiceProvider,public alertCtrl:AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddressPage');
  }
  ionViewWillEnter(){
  this.userinfo=this.tools.getUserInfo();

   this.getAddressList();
  }

  getAddressList(){
   let userinfo:any=this.userinfo
    let json={
      uid:userinfo._id,
      salt:userinfo.salt
    }

    let sign=this.tools.sign(json);

    var api='api/addressList?uid='+userinfo._id+'&sign='+sign;

    this.httpService.requestData(api,(data)=>{
      console.log(data);

      if(data.success){
        this.list=data.result;
      }else{
        alert(data.message)
      }
    

      
    })

  }
  changeAddress(id){

    let userinfo:any=this.userinfo;

    let json={
      uid:userinfo._id,
      salt:userinfo.salt,
      id:id
    }
    let sign=this.tools.sign(json)

    var api='api/changeDefaultAddress';

    this.httpService.doPost(api,{
      uid:userinfo._id,
      sign:sign,
      id:id
    },(data)=>{
     // console.log(data);
     if(data.success){
      this.navCtrl.pop();
     }else{
       console.log(data.message);
       
     }
      
    })
  }

  deleteAddress(key,id){
    let that:any=this;
    let confirm = this.alertCtrl.create({
      title:'提示信息',
      message:'您确定要删除该地址吗？',
      buttons:[
        {
          text:'取消',
          handler:()=>{
            console.log('no clicked');
            
          }
        },
        {
          text:'确定',
          handler:()=>{
            console.log(key,id);
           that.deleteAddressAction(key,id);
          }
        }
      ]
    });
    confirm.present();
  }

  deleteAddressAction(key,address_id){
    
    let userinfo:any=this.userinfo;

    let json={
      uid:userinfo['_id'],
      salt:userinfo['salt'],
      id:address_id
    }

    let sign=this.tools.sign(json);

    let api='api/deleteAddress';

    this.httpService.doPost(api,{
      uid:userinfo['_id'],
      sign:sign,
      id:address_id
    },(data)=>{
      if(data.success){
        this.list.splice(key,1);
      }else{
        alert(data.message)
      }
    })


  }
  
  editAddress(item){

    this.navCtrl.push(EditaddressPage,{
      item:item
    })
  }


}
