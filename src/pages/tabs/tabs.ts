import { Component } from '@angular/core';
import { PostPage } from '../post/post';
import {LoginPage} from '../login/login';
import { RelacionamentoPage } from '../relacionamento/relacionamento';
import { ComunhaoPage } from '../comunhao/comunhao';
import { MissaoPage } from '../missao/missao';


@Component({
    templateUrl: 'tabs.html'
  })
  
  export class TabsPage {
  
    tab1Root  = ComunhaoPage;
    tab2Root  = RelacionamentoPage;
    tab3Root  = MissaoPage;
   
    constructor() {

    }
   
    
  }