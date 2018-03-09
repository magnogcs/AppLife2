import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ComunhaoPage } from '../comunhao/comunhao';
import { RelacionamentoPage } from '../relacionamento/relacionamento';
import { MissaoPage } from '../missao/missao';
import { VideosPage } from '../videos/videos';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
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
}
