import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { LoginPage } from "../login/login";
import { StorageProvider } from "../../providers/storage/storage";
import { RegisterPage } from "../register/register";
import { PersonalPage } from "../personal/personal";

/**
 * Generated class for the UserPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {
  public LoginPage=LoginPage;
  public RegisterPage=RegisterPage;
  public userinfo='';
  public PersonalPage=PersonalPage;
  constructor(public navCtrl: NavController, public navParams: NavParams,public storage:StorageProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPage');
  }
  ionViewWillEnter(){
   var userinfo=this.storage.get('userinfo')
   if(userinfo&&userinfo.username){
    this.userinfo=userinfo;
   }else{
     this.userinfo='';
   }
  }

}
