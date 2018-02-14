import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { Http } from '@angular/http';

@Component({
  templateUrl: 'comment.html',
})
export class CommentPage {

  constructor(
    private navCtrl: NavController,
    public alertCtrl: AlertController,
    private viewCtrl: ViewController,
    private params: NavParams,
    private http: Http
  ) {}

  doComment(value, event){
    this.http.post(this.params.data.url, value).subscribe( data =>{
      this.viewCtrl.dismiss();
    });
   
  }

  dismiss(){
    this.viewCtrl.dismiss();
  }

}
