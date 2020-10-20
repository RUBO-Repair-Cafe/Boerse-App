import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { OwnListingsRoutingModule } from './own-listings-routing.module';
import { OwnListingsPage } from './own-listings.page';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OwnListingsRoutingModule
  ],
  declarations: [OwnListingsPage]
})
export class SearchPageModule {}
