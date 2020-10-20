import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TabsPageRoutingModule } from './tabs-routing.module';

import { TabsPage } from './tabs.page';
import { LoginModalComponent } from './login-modal/login-modal.component';
import { RegisterModalComponent } from './register-modal/register-modal.component';
import { ComponentsModule } from '../components/components.module';
import { ListingComponent } from './listing/listing.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TabsPageRoutingModule,
    ReactiveFormsModule,
    ComponentsModule
  ],
  declarations: [TabsPage, LoginModalComponent, RegisterModalComponent, ListingComponent],
  exports: [TabsPage]
})
export class TabsPageModule {}
