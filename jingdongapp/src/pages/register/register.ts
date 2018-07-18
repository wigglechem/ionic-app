import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegistersignPage } from "../registersign/registersign";
import { HttpServiceProvider } from "../../providers/http-service/http-service";
import { StorageProvider } from "../../providers/storage/storage";

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
})
export class RegisterPage {
  public tel='';
  constructor(public navCtrl: NavController, public navParams: NavParams,public httpService:HttpServiceProvider,public storage:StorageProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterPage');
  }
  goRegistersignPage(){
    

    if(/^\d{11}$/.test(this.tel)){

      var api='api/sendCode';

    this.httpService.doPost(api,{"tel":this.tel},(result)=>{
      console.log(result);
      
      if(result.success){
        this.storage.set('reg_tel',this.tel);
        this.navCtrl.push(RegistersignPage)//如果成功 跳转到下一个页面
      }else{
        console.log('发送验证码失败 '+result.message);
        
      }

    })
    }else{

      console.log('请输入正确的电话号码');
      
    }

    //电话号码是否合法验证
    
    
  }

}
