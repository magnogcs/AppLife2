import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {Observable} from 'rxjs/Observable';
import {YtProvider} from './../../providers/yt/yt';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { PlaylistPage } from '../playlist/playlist';

@IonicPage()
@Component({
  selector: 'page-videos',
  templateUrl: 'videos.html',
})
export class VideosPage {
  channelId='UC8AAddLbCSV--CtDpwaxAgA';
  playlists: Observable<any[]>;

  constructor(public navCtrl: NavController, private ytProvider: YtProvider, private alertCtrl: AlertController) {
  }

searchPlaylists(){
  this.playlists = this.ytProvider.getPlaylistsForChannel(this.channelId);
  this.playlists.subscribe(data=>{
    console.log('data', data);
  }, err =>{
    let alert = this.alertCtrl.create({
      title: 'Erro',
      message: 'Nenhuma playlist encontrada',
      buttons: ['OK']
    });
    alert.present();
  })
}
 openPlaylistId(id){
   this.navCtrl.push(PlaylistPage, {id: 'PLgO0NAZSgdWcps-mgdewqIJswgAmz7XAs'});
 }
  ionViewDidLoad() {
    console.log('ionViewDidLoad VideosPage');
  }

}
