import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { RegisterpasswordPage } from "../registerpassword/registerpassword";
import { HttpServiceProvider } from "../../providers/http-service/http-service";
import { StorageProvider } from "../../providers/storage/storage";

/**
 * Generated class for the RegistersignPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registersign',
  templateUrl: 'registersign.html',
})
export class RegistersignPage {

  public code='';
  public isShowSend=false;
  public num=10;
  public tel='';

  constructor(public navCtrl: NavController, public navParams: NavParams, public httpService: HttpServiceProvider, public storage: StorageProvider) {
  this.tel=this.storage.get('reg_tel')
  }

  ionViewDidLoad() {
    this.doTimer()
  }
  goRegisterpasswordPage(){
    
    var api='api/validateCode';
    

    this.httpService.doPost(api, { "tel": this.tel,"code":this.code }, (result) => {
      console.log(result);

      if (result.success) {
       //保存验证码
        this.storage.set('reg_code',this.code)

       
        this.navCtrl.push(RegisterpasswordPage);

      } else {
        console.log('验证码输入错误');

      }

    })

    
  }

  //倒计时方法
 doTimer(){
   var timer=setInterval(()=>{
    --this.num;
    if(this.num==0){
      clearInterval(timer);
      this.isShowSend=true;
    }
   },1000)
 }


  //发送验证码
  sendCode(){
    
    

    console.log('重新发送验证码');
    var api = 'api/sendCode';

    this.httpService.doPost(api, { "tel":this.tel }, (result) => {
      console.log(result);

      if (result.success) {
        this.num=10;
        this.doTimer();
        
        this.isShowSend=false;
        

        
      } else {
        console.log('发送验证码失败');

      }

    })
    
  }

}
