import { Component } from '@angular/core';
import { PostPage } from '../post/post';
import { LoginPage } from '../login/login';
import { HomePage } from '../home/home';
import { RelacionamentoPage } from '../relacionamento/relacionamento';
import { MissaoPage } from '../missao/missao';
import { NavController, LoadingController, NavParams } from 'ionic-angular';
import { WordpressService } from '../../services/wordpress.service';
import { AuthenticationService } from '../../services/authentication.service';
import { VideosPage } from '../videos/videos';
import {Observable} from 'rxjs/Observable';
import {YtProvider} from './../../providers/yt/yt';
import { AlertController } from 'ionic-angular/components/alert/alert-controller';
import { PlaylistPage } from '../playlist/playlist';



@Component({
  selector: 'page-comunhao',
  templateUrl: 'comunhao.html'
})



export class ComunhaoPage {


  
	posts: Array<any> = new Array<any>();
  morePagesAvailable: boolean = true;
  loggedUser: boolean = false;

  categoryId: number;
  categoryTitle: string;
  
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public wordpressService: WordpressService,
    public authenticationService: AuthenticationService,
    private ytProvider: YtProvider,
    private alertCtrl: AlertController
  ) {}


  ionViewWillEnter() {
    this.authenticationService.getUser()
    .then(
      data => this.loggedUser = true,
      error => this.loggedUser = false
    );
    this.morePagesAvailable = true;

    //if we are browsing a category
    this.categoryId = this.navParams.get('id');
    this.categoryTitle = this.navParams.get('title');

    if(!(this.posts.length > 0)){
      let loading = this.loadingCtrl.create();
      loading.present();

      this.wordpressService.getRecentPosts(this.categoryId)
      .subscribe(data => {
        for(let post of data){
          post.excerpt.rendered = post.excerpt.rendered.split('<a')[0] + "</p>";
          this.posts.push(post);
        }
        loading.dismiss();
      });
    }
  }

  postTapped(event, post) {
		this.navCtrl.push(PostPage, {
		  item: post
		});
  }

  doInfinite(infiniteScroll) {
    let page = (Math.ceil(this.posts.length/10)) + 1;
    let loading = true;

    this.wordpressService.getRecentPosts(this.categoryId, page)
    .subscribe(data => {
      for(let post of data){
        if(!loading){
          infiniteScroll.complete();
        }
        post.excerpt.rendered = post.excerpt.rendered.split('<a')[0] + "</p>";
        this.posts.push(post);
        loading = false;
      }
    }, err => {
      this.morePagesAvailable = false;
    })
  }

  logOut(){
    this.authenticationService.logOut()
    .then(
      res => this.navCtrl.push(LoginPage),
      err => console.log('Error in log out')
    )
  }

  goToLogin(){
    this.navCtrl.push(LoginPage);
  }
  goMissao(){
    this.navCtrl.push(MissaoPage);
  }
  goRelacionamento(){
    this.navCtrl.setRoot(RelacionamentoPage);
  }
  Post(){
      this.navCtrl.push(HomePage);
  }
  channelId='UCCHvPQKfxL4nYPkZjJ6yTZg ';
  playlists: Observable<any[]>;

searchPlaylists(){
  this.playlists = this.ytProvider.getPlaylistsForChannel(this.channelId);
  this.playlists.subscribe(data=>{
    console.log('data', data);
  }, 

  
  err =>{
    let alert = this.alertCtrl.create({
      title: 'Erro',
      message: 'Nenhuma playlist encontrada',
      buttons: ['OK']
    });
    alert.present();
    
  })
  
}
 openPlaylistId(id){
   this.navCtrl.push(PlaylistPage, {id: id});
 }
 goVideos(){
  this.navCtrl.push(VideosPage);
 }
  ionViewDidLoad() {
    console.log('ionViewDidLoad VideosPage');
  }
}
