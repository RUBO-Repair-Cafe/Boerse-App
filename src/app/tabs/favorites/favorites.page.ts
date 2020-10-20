import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ModalController, NavController } from '@ionic/angular';
import { ListingService } from 'src/app/services/listing.service';
import { StorageService } from 'src/app/services/storage.service';
import { IBasicListing } from 'src/shared/interfaces/listing/basicListing.interface';
import { IListingOverview } from 'src/shared/interfaces/listing/listingOverview.interface';
import { ListingComponent } from '../listing/listing.component';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

  private _bookmarkIds: string[]
  listings: IListingOverview[]
  pageIndex = 0;
  private _loadingElement: HTMLIonLoadingElement;

  constructor(
    private readonly _storageService: StorageService,
    private readonly _listingService: ListingService,
    private readonly _loading: LoadingController,
    private readonly _modal: ModalController,
  ) { }

  async ngOnInit(){
    this._loadingElement = await this._loading.create();
    this.ionViewWillEnter();
  }

  async ionViewWillEnter() {
    this._bookmarkIds = await this._storageService.getBookmarks();
    this.getListingInfos();
  }

  async getListingInfos() {
    this._loadingElement.present()
    try {
      this.listings = await this._listingService.getMultiple(this._bookmarkIds);
      console.log(this.listings);
    } catch (error) {
      console.error(error);
    } finally {
      this._loadingElement.dismiss();
    }
  }

  async loadData($e) {
    console.log($e);
  }

  async onDelete(item: IBasicListing) {
    try {
      await this._storageService.removeBookmark(item.listingId);
      const index = this.listings.findIndex((element) => element.listingId === item.listingId);
      console.log('index', index);
      if (index >= 0) {
        // this.listings.splice(index, 1);
      }
    } catch (error) {
      
    }
  }


  async openListing(item: IBasicListing) {
    const modal = await this._modal.create({
      component: ListingComponent,
      componentProps: {
        listingId: item.listingId
      }
    })
    
    modal.present();
  }

}
