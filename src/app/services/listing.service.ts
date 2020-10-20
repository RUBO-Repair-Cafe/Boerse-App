import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { IBasicListing } from 'src/shared/interfaces/listing/basicListing.interface';
import { IListingOverview } from 'src/shared/interfaces/listing/listingOverview.interface';

@Injectable({
  providedIn: 'root'
})
export class ListingService {

  constructor(private _http: HttpClient) { }

  getListing(listingId: string) {
    return this._http.get<IBasicListing>(`${environment.apiUrl}/listings/${listingId}`).toPromise();
  }

  async getListings(take = 20, skip = 0, searchString?): Promise<IListingOverview[]> {
    let queryUrl = `${environment.apiUrl}/listings?take=${take}&skip=${skip}`;
    if (searchString && searchString !== '') {
      queryUrl += `&searchValue=${searchString}`;
    }
    return this._http.get<IListingOverview[]>(queryUrl).toPromise();
  }

  async getMultiple(listingIds: string[]){
    const promisses: Promise<IBasicListing>[] = [];
    for (const listingID of listingIds) {
      console.log(listingID);
      promisses.push(this.getListing(listingID));
    }
    let results: IBasicListing[]; 
    try {
      results = await Promise.all(promisses);
    } catch (error) {
      console.error(error);
      throw new Error('Error getting bookmarks');
    }
    return results;
  }
}
