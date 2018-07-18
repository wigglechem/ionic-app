import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { StorageProvider } from "../../providers/storage/storage";
import { HttpServiceProvider } from "../../providers/http-service/http-service";
/**
 * Generated class for the RegisterpasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registerpassword',
  templateUrl: 'registerpassword.html',
})
export class RegisterpasswordPage {
  public tel='';
  public code='';

  public password='';
  public rpassword='';


  constructor(public navCtrl: NavController, public navParams: NavParams,public storage:StorageProvider,public httpService:HttpServiceProvider) {
  
    this.tel=storage.get('reg_tel');

    this.code=storage.get('reg_code');
  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegisterpasswordPage');
  }

  doRegister(){
    if(this.password!=this.rpassword){
      console.log('密码与确认密码不一致，请重新输入');
      
    }else if(this.password.length<6){
      console.log('密码长度不能小于六位');
      
    }else{
        var api='api/register';

        this.httpService.doPost(api,{"tel":this.tel,"code":this.code,'password':this.password},(result)=>{
          console.log(result);

          if(result.success){
              this.storage.set('userinfo',result.userinfo[0])
              this.navCtrl.popToRoot();
          }else{
            alert('注册失败')
          }
          
        })
    }
  }

}
