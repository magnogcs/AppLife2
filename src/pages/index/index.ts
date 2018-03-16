import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ComunhaoPage } from '../comunhao/comunhao';
import { RelacionamentoPage } from '../relacionamento/relacionamento';
import { MissaoPage } from '../missao/missao';
import { VideosPage } from '../videos/videos';
import { HomePage } from '../home/home';
import { YoutubeVideoPlayer } from '@ionic-native/youtube-video-player';
import {YtProvider} from './../../providers/yt/yt';
import { Platform } from 'ionic-angular/platform/platform';
import {Observable} from 'rxjs/Observable';

/**
 * Generated class for the IndexPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-index',
  templateUrl: 'index.html',
})
export class IndexPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private plt: Platform, private youtube:  YoutubeVideoPlayer, private ytProvider: YtProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad IndexPage');
  }
  goComunhao(){
    this.navCtrl.push(ComunhaoPage);
  }
  goRelacionamento(){
    this.navCtrl.push(RelacionamentoPage);
  }
  goMissao(){
    this.navCtrl.push(MissaoPage)
  }
  goVideos(){
    this.navCtrl.push(VideosPage);
   }
   goFotos(){
     window.open('https://tagboard.com/EstiloLife/414824');
   }
   openVideo(){
    if (this.plt.is('cordova')){
      this.youtube.openVideo('C4oIrk7q3k0');
    }else{
      window.open('https://www.youtube.com/watch?v=C4oIrk7q3k0');
    }
   }
   goToCategoryPosts(categoryId, categoryTitle){
    this.navCtrl.push(HomePage, {
      id: categoryId,
      title: categoryTitle
    })
  }
}
