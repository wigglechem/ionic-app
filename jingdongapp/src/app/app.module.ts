import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';


import { CartPage } from '../pages/cart/cart';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { CategoryPage } from "../pages/category/category";

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { UserPage } from '../pages/user/user';
import { PcontentPage } from "../pages/pcontent/pcontent";
import { ProductlistPage } from "../pages/productlist/productlist";
import { PersonalPage } from "../pages/personal/personal";
import { SearchPage } from "../pages/search/search";
import { OrderPage } from "../pages/order/order";
import { AddressPage } from "../pages/address/address";
import { AddaddressPage } from "../pages/addaddress/addaddress";
import { EditaddressPage } from "../pages/editaddress/editaddress";
import { PaymentPage } from "../pages/payment/payment";

import { RegisterPage } from "../pages/register/register";
import { RegistersignPage } from "../pages/registersign/registersign";
import { RegisterpasswordPage } from "../pages/registerpassword/registerpassword";
import { LoginPage } from "../pages/login/login";
import { ConfigProvider } from '../providers/config/config';
import { HttpServiceProvider } from '../providers/http-service/http-service';
import { HttpModule, JsonpModule } from '@angular/http';
import { StorageProvider } from '../providers/storage/storage';
import { ToolsProvider } from '../providers/tools/tools';


@NgModule({
  declarations: [
    MyApp,
    CategoryPage,
    CartPage,
    HomePage,
    TabsPage,
    UserPage,
    LoginPage,
    RegisterPage,
    RegistersignPage,
    RegisterpasswordPage,
    SearchPage,
    ProductlistPage,
    PcontentPage,
    PersonalPage,
    OrderPage,
    AddressPage,
    AddaddressPage,
    EditaddressPage,
    PaymentPage
    

    
  ],
  imports: [
    BrowserModule,
    HttpModule,JsonpModule,
    IonicModule.forRoot(MyApp,{
      tabsHideOnSubPages:'true',
      backButtonText:''
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    CategoryPage,
    CartPage,
    HomePage,
    TabsPage,
    UserPage,
    LoginPage,
    RegisterPage,
    RegistersignPage,
    RegisterpasswordPage,
    SearchPage,
    ProductlistPage,
    PcontentPage,
    PersonalPage,
    OrderPage,
    AddressPage,
    AddaddressPage,
    EditaddressPage,
    PaymentPage

  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ConfigProvider,
    HttpServiceProvider,
    StorageProvider,
    ToolsProvider
  ]
})
export class AppModule {}
