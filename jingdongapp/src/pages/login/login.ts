import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpServiceProvider } from "../../providers/http-service/http-service";
import { StorageProvider } from "../../providers/storage/storage";
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  public history='';
  public userinfo={
    username:'',
    password:''
  }
  constructor(public navCtrl: NavController, public navParams: NavParams,public httpService:HttpServiceProvider,public storage:StorageProvider) {
  this.history=this.navParams.get('history');
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }
 
  doLogin(){

    if(this.userinfo.username.length<6){
      console.log('用户名不合法');
      
    }else{
       console.log(this.userinfo);
    var api = 'api/doLogin';

    this.httpService.doPost(api,this.userinfo,(data)=>{

      console.log(data);

      
      if(data.success){
        this.storage.set('userinfo',data.userinfo[0]);
        if(this.history=='order'){
          this.navCtrl.pop();
        }else{
          this.navCtrl.popToRoot();
        }
        
      }

      else{
        console.log(data.message);
      }
      


    })

    }
  }

}
