import { Component, ViewChild  } from '@angular/core';
import { ReplaySubject } from "rxjs/ReplaySubject";
import { ArrayObservable } from "rxjs/observable/ArrayObservable";
import { Platform, Nav, MenuController, AlertController } from 'ionic-angular';
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
    authenticationService: AuthenticationService
  ) 
  
  
  {
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
			this.unreadCountObservable.next(Math.floor(Math.random() * 10));
		}, 5000);

	}

	private initializeOptions(): void {
		this.options = new Array<MenuOptionModel>();

		// Load simple menu options
		// ------------------------------------------
		this.options.push({
			iconName: 'home',
			displayName: 'Comunhão',
			component: HomePage,

			// This option is already selected
			selected: true
		});

		this.options.push({
			iconName: 'bookmarks',
			displayName: 'Relacionamento',
			component: MissaoPage
		});

		this.options.push({
			iconName: 'chatbubbles',
			displayName: 'Missão',
			component: MissaoPage
		});

		this.options.push({
			iconName: 'chatbubbles',
			displayName: 'Vídeos',
			component: MissaoPage
		});

		this.options.push({
			iconName: 'chatbubbles',
			displayName: 'Materiais',
			component: MissaoPage
		});

		this.options.push({
			iconName: 'chatbubbles',
			displayName: 'Lição',
			component: MissaoPage
		});

		this.options.push({
			iconName: 'chatbubbles',
			displayName: 'Bíblia',
			component: MissaoPage
		});
/*
		this.options.push({
			iconName: 'bowtie',
			displayName: 'With Badge',
			badge: ArrayObservable.of('NEW'),
			component: MissaoPage
		});

		// Load options with nested items (with icons)
		// -----------------------------------------------
		this.options.push({
			displayName: 'Sub options with icons',
			subItems: [
				{
					iconName: 'basket',
					displayName: 'Sub Option 1',
					component: MissaoPage
				},
				{
					iconName: 'bookmark',
					displayName: 'Sub Option 2',
					component: MissaoPage
				},
				{
					iconName: 'bug',
					displayName: 'With Badge',
					badge: this.unreadCountObservable,
					component: MissaoPage
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
					component: MissaoPage
				},
				{
					displayName: 'Sub Option 5',
					component: MissaoPage
				},
				{
					displayName: 'Sub Option 6',
					component: MissaoPage
				},
				{
					displayName: 'Sub Option 7',
					component: MissaoPage
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
				window.open(url, '_blank');
			} else {
				// Redirect to the selected page
				this.navCtrl.setRoot(option.component || MissaoPage, { 'title': option.displayName });
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

