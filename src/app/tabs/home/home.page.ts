import { Component, OnInit } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/auth/auth.service';
import { ListingService } from 'src/app/services/listing.service';
import { IListingOverview } from 'src/shared/interfaces/listing/listingOverview.interface';
import { LoginModalComponent } from '../login-modal/login-modal.component';
import { RegisterModalComponent } from '../register-modal/register-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  private _currentPage = 0;
  private _pageSize = 20;
  private _loading: HTMLIonLoadingElement;

  listings: IListingOverview[] = [];
  filteredListings: IListingOverview[] = [];

  isFiltered = false;

  constructor(
    private _modal: ModalController,
    private _listingService: ListingService,
    private _loadingController: LoadingController,
    private _auth: AuthService,
    ) { }

  async ngOnInit() {
    this._loading = await this._loadingController.create()
    try {
      this._loading.present()
      this.listings = await this._listingService.getListings(this._pageSize, 0)
      this.filteredListings = this.listings;
      this._currentPage = 1;
    } catch (error) {
      console.error(error)
    } finally {
      this._loading.dismiss()
    }
  }

  get isLoggedIn(): boolean {
    return this._auth.isLoggedIn;
  }

  /**
   * @todo Implement creation
   */
  async onAdd() {
  }

  async onRefresh(event) {
    try {
      if (!this.isFiltered){
        this.listings = await this._listingService.getListings(this._pageSize, 0);
      } else {
        this.filteredListings = await this._listingService.getListings(20, 0, event.detail.value);
      }
    } catch (error) {
      console.error(error);
    } finally{
      event.target.complete();
    }
  }

  async onLogin(){
    const modal = await this._modal.create({
      component: LoginModalComponent
    })
    modal.present();
  }

  async loadData(event){
    try {
      const newListings = await this._listingService.getListings(this._pageSize, this._pageSize * this._currentPage)
      this._currentPage += 1;
      this.listings = this.listings.concat(newListings);
      if (newListings.length < this._pageSize){
        event.target.disabled = true;
      }
    } catch (error) {
      console.error(error);
    } finally{
      event.target.complete();
    }
  }

  async search(event) {
    if (event.detail.value.length > 2) {
      // Doesnt work yet... getting all articles... not only the searchString matching ones
      const searchedListings = await this._listingService.getListings(20, 0, event.detail.value);
      console.log('searchedListings', searchedListings);
      this.filteredListings = searchedListings;
      this.isFiltered = true;
    } else {
      this.filteredListings = this.listings;
      this.isFiltered = false;
    }
  }
}
