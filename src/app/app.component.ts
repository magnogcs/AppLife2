import { Component, ViewChild  } from '@angular/core';
import { ReplaySubject } from "rxjs/ReplaySubject";
import { ArrayObservable } from "rxjs/observable/ArrayObservable";
import { Platform,NavController, NavParams, Nav, MenuController, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { HomePage } from '../pages/home/home';
import { LoginPage } from '../pages/login/login';
import { AuthenticationService } from '../services/authentication.service';
import { TabsPage } from '../pages/tabs/tabs';
import {VideosPage} from '../pages/videos/videos';
import { CommentPage} from '../pages/comment/comment';
import { SideMenuContentComponent } from '../pages/menu/side-menu-content.component';
import { SideMenuSettings } from '../pages/menu/models/side-menu-settings';
import { MenuOptionModel } from '../pages/menu/models/menu-option-model';
import { MissaoPage } from '../pages/missao/missao';
import { IndexPage } from '../pages/index/index';
import { ComunhaoPage } from '../pages/comunhao/comunhao';
import { RelacionamentoPage } from '../pages/relacionamento/relacionamento';
import { CamisaPage } from '../pages/camisa/camisa';





@Component({
  templateUrl: 'app.html'
})


export class MyApp {
  @ViewChild(Nav) navCtrl: Nav;
 
	// Get the instance to call the public methods
	@ViewChild(SideMenuContentComponent) sideMenu: SideMenuContentComponent;

  rootPage:any = IndexPage;

	// Options to show in the SideMenuComponent
	public options: Array<MenuOptionModel>;

	// Settings for the SideMenuComponent
	public sideMenuSettings: SideMenuSettings = {
		accordionMode: true,
		showSelectedOption: true,
		selectedOptionClass: 'active-side-menu-option',
		subOptionIndentation: {
			md: '56px',
			ios: '64px',
			wp: '56px'
		}
	};

private unreadCountObservable: any = new ReplaySubject<number>(0);

  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private alertCtrl: AlertController,
    private menuCtrl: MenuController,
	authenticationService: AuthenticationService,
	
  ) 
  
  
  {
	var notificationOpenedCallback = function(jsonData) {
		console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
	  };
  
	  window["plugins"].OneSignal
		.startInit("dcc27f13-0f0a-405b-a3b3-463e51437e77", "546066873752")
		.handleNotificationOpened(notificationOpenedCallback)
		.endInit();
	
    this.initializeApp();
	}

	initializeApp() {
		this.platform.ready().then(() => {
			this.statusBar.styleLightContent();
			this.splashScreen.hide();

			// Initialize some options
			this.initializeOptions();
		});

		// Change the value for the batch every 5 seconds
		setInterval(() => {
			this.unreadCountObservable.next(Math.floor(Math.random() * 1));
		}, 5000);

	}

	private initializeOptions(): void {
		this.options = new Array<MenuOptionModel>();

		// Load simple menu options
		// ------------------------------------------
		this.options.push({
			iconName: 'md-home',
			displayName: 'Inicio',
			component: IndexPage
			
		
		});
		this.options.push({
			iconName: 'ios-heart',
			displayName: 'Comunhão',
			component: ComunhaoPage,
			
		
		});

		this.options.push({
			iconName: 'md-contacts',
			displayName: 'Relacionamento',
			component: RelacionamentoPage,
			
		});

		this.options.push({
			iconName: 'md-globe',
			displayName: 'Missão',
			component: MissaoPage,
			
		});

		this.options.push({
			iconName: 'logo-youtube',
			displayName: 'Vídeos',
			custom: {
				isExternalLink: true,
				externalUrl: 'https://www.youtube.com/watch?v=C4oIrk7q3k0'
			}
		
			
			
		});

		this.options.push({
			iconName: 'md-bookmark',
			displayName: 'Materiais',
			custom: {
				isExternalLink: true,
				externalUrl: 'http://bit.ly/BahiaCentral'
			}
			
			
		});

		/*this.options.push({
			iconName: 'md-book',
			displayName: 'Lição',
			
		});*/

		/*this.options.push({
			iconName: 'ios-bookmarks',
			displayName: 'Bíblia',
			
		});*/
		this.options.push({
			iconName: 'md-musical-note',
			displayName: 'Playlist',
			custom: {
				isExternalLink: true,
				externalUrl: 'https://open.spotify.com/user/12155906793/playlist/4w4P1gA8q6SKsQ47cSeRHd?si=J2mxooG0SH-4Jl1Gh_pEyw'
			}
		});
		
		this.options.push({
			iconName: 'md-images',
			displayName: 'Fotos',
			custom: {
				isExternalLink: true,
				externalUrl: 'https://tagboard.com/EstiloLife/414824'
			}
			
		});

		this.options.push({
			iconName: 'ios-shirt-outline',
			displayName: 'Compre sua camisa',
			component: CamisaPage,
			
		});

		

		
	
/*
		this.options.push({
			iconName: 'bowtie',
			displayName: 'With Badge',
			badge: ArrayObservable.of('NEW'),
			
		});

		// Load options with nested items (with icons)
		// -----------------------------------------------
		this.options.push({
			displayName: 'Sub options with icons',
			subItems: [
				{
					iconName: 'basket',
					displayName: 'Sub Option 1',
					
				},
				{
					iconName: 'bookmark',
					displayName: 'Sub Option 2',
					
				},
				{
					iconName: 'bug',
					displayName: 'With Badge',
					badge: this.unreadCountObservable,
					
				}
			]
		});

		// Load options with nested items (without icons)
		// -----------------------------------------------
		this.options.push({
			displayName: 'Sub options without icons',
			subItems: [
				{
					displayName: 'Sub Option 4',
					
				},
				{
					displayName: 'Sub Option 5',
					
				},
				{
					displayName: 'Sub Option 6',
					
				},
				{
					displayName: 'Sub Option 7',
					
				}
			]
		});

		// Load special options
		// -----------------------------------------------
		this.options.push({
			displayName: 'Special options',
			subItems: [
				{
					iconName: 'log-in',
					displayName: 'Login',
					custom: {
						isLogin: true
					}
				},
				{
					iconName: 'log-out',
					displayName: 'Logout',
					custom: {
						isLogout: true
					}
				},
				{
					iconName: 'globe',
					displayName: 'Open Google',
					custom: {
						isExternalLink: true,
						externalUrl: 'http://www.google.com'
					}
				}
			]
		});*/
	}

	public selectOption(option: MenuOptionModel): void {
		this.menuCtrl.close().then(() => {
			if (option.custom && option.custom.isLogin) {
				this.presentAlert('You\'ve clicked the login option!');
			} else if (option.custom && option.custom.isLogout) {
				this.presentAlert('You\'ve clicked the logout option!');
			} else if (option.custom && option.custom.isExternalLink) {
				let url = option.custom.externalUrl;
				window.open(url);
			} else {
				// Redirect to the selected page
				this.navCtrl.push(option.component || IndexPage);
			}
		});
	}

	public collapseMenuOptions(): void {
		this.sideMenu.collapseAllOptions();
	}

	public presentAlert(message: string): void {
		let alert = this.alertCtrl.create({
			title: 'Information',
			message: message,
			buttons: ['Ok']
		});
		alert.present();
}
  }

