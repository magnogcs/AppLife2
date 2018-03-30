import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CamisaPage } from './camisa';

@NgModule({
  declarations: [
    CamisaPage,
  ],
  imports: [
    IonicPageModule.forChild(CamisaPage),
  ],
})
export class CamisaPageModule {}
