import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { IonRouterOutlet, LoadingController, ModalController, NavController } from '@ionic/angular';
import { ListingService } from 'src/app/services/listing.service';
import { StorageService } from 'src/app/services/storage.service';
import { IBasicListing } from 'src/shared/interfaces/listing/basicListing.interface';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss'],
})
export class ListingComponent implements OnInit {

  listingData: IBasicListing;
  loadingSpinner: HTMLIonLoadingElement;

  @Input() listingId: string;

  isBookmarked = false;

  constructor(
    private _loading: LoadingController,
    private readonly _listingService: ListingService,
    private readonly _route: ActivatedRoute,
    private readonly _storageService: StorageService,
    private readonly _modal: ModalController,
  ) { }

  async ngOnInit() {
    this.loadingSpinner = await this._loading.create();
    if (!this.listingId){
      return;
    }
  }

  async ionViewWillEnter() {
    console.log('will enter', this.listingData);
    this.loadingSpinner.present();
    this.isBookmarked = await this._storageService.isInBookmarks(this.listingId);
    this.getListingData();
  }

  async getListingData() {
    try {
      if (!this.listingId) {
        console.error('No Listing ID provided to modal');
      }
      this.listingData = await this._listingService.getListing(this.listingId);
      console.log('listingData', this.listingData);
    } catch (error) {
      console.error(error);
    } finally {
      this._loading.dismiss();
    }
  }

  async setBookmark(isBookmark: boolean){
    console.log(this.listingId);
    console.log(isBookmark);
    if (this.listingId && isBookmark){
      console.log('adding')
      this._storageService.addToBookmarks(this.listingId);
      this.isBookmarked = true;
    } else if (this.listingId && !isBookmark) {
      console.log('removing from bookmarks');
      this._storageService.removeBookmark(this.listingId);
      this.isBookmarked = false;
    }
  }

  // Makes the creationDate human readable
  convertDate(date: string): string {
    let d = new Date(date);
    return '' + this.appendZeros(d.getDate()) + '.' + this.appendZeros(d.getMonth()+1) + '.' + d.getFullYear() + ' um ' + this.appendZeros(d.getHours()) + ':' + this.appendZeros(d.getMinutes()) + ' Uhr';
  }

  private appendZeros(time: number): string{
    if (time < 10) {
      return '0'+time;
    }
    return ''+time;
  }

  closeModal(){
    this._modal.dismiss();
  }
}
