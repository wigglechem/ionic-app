import { Component,ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams,Content,AlertController } from 'ionic-angular';
import { ConfigProvider } from "../../providers/config/config";
import { HttpServiceProvider } from "../../providers/http-service/http-service";
import { StorageProvider } from "../../providers/storage/storage";
/**
 * Generated class for the SearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html',
})
export class SearchPage {

  @ViewChild(Content) content:Content;

  public flag=false;

  public keywords='';

  public list=[];

  public page=1;

  public hasData=true;

  public historyList=[];

  constructor(public navCtrl: NavController, public navParams: NavParams,public config:ConfigProvider,public httpService:HttpServiceProvider,public storage:StorageProvider,public alertCtrl:AlertController) {
     this.getHistory();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }
  getSearchList(infiniteScroll){

    if(!infiniteScroll){
      this.page=1;
      this.hasData=true;

      this.content.scrollToTop(0);

      this.saveHistory();

    }

    
    var api='api/plist?search='+this.keywords+'&page='+this.page;
    this.httpService.requestData(api,(data)=>{
      
        if(this.page==1){
          this.list=data.result;
        }else{
          this.list=this.list.concat(data.result);
        }
      
      this.flag=true;


      if(infiniteScroll){
        infiniteScroll.complete();

       if(data.result<10){
         this.hasData=false;
       }
      }
      this.page++;
    })
  }
//点击历史记录执行的方法
goSearch(keywords){
this.keywords=keywords;
this.getSearchList('');
}



  doLoadMore(infiniteScroll){
    this.getSearchList(infiniteScroll)
  }
  //保存历史记录

  saveHistory(){
     var history=this.storage.get('historyData')

      if(history){
         
        if(history.indexOf(this.keywords)==-1){
           history.unshift(this.keywords);
           this.storage.set('historyData',history);
        }



      }else{
         this.historyList.unshift(this.keywords)
         
         this.storage.set('historyData',this.historyList)
      }

  }
  getHistory(){
    var history=this.storage.get('historyData')

    if(history){
      this.historyList=history
    }

  }

  removeHistory(keywords){
    let confirm = this.alertCtrl.create({
      title: '您确定要删除吗?',
      message: '您确定要删除这条历史记录吗，确定点击是',
      buttons: [
        {
          text: '否',
          handler: () => {

          }
        },
        {
          text: '是',
          handler: () => {

            var index = this.historyList.indexOf(keywords);
            // console.log(index);

            this.historyList.splice(index, 1);
            //写入到localstorage
            this.storage.set('historyData', this.historyList);
          }
        }
      ]
    });
    confirm.present();

  }

}
