
import { Injectable } from '@angular/core';
import { StorageProvider } from "../../providers/storage/storage";

import { Md5 } from "ts-md5/dist/md5";

/*
  Generated class for the ToolsProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ToolsProvider {

  constructor(public storage:StorageProvider) {
    console.log('Hello ToolsProvider Provider');
  }
  getUserInfo(){

    var userinfo=this.storage.get('userinfo');
    if(userinfo){
      return userinfo;
    }else{
      return '';
    }
    

  }
  sign(json){
    
   
    var tempArr=[];

    for(let attr in json){
      tempArr.push(attr)
    }

    tempArr=tempArr.sort();

    var tempStr='';

    for(let i=0;i<tempArr.length;i++){

      tempStr+=tempArr[i]+json[tempArr[i]];
    }

    return Md5.hashStr(tempStr);
    
  }

}
