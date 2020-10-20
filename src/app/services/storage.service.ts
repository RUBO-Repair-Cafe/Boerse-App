import { Injectable } from '@angular/core';
import { Plugins } from '@capacitor/core'
const { Storage } = Plugins

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() { }

  async addToBookmarks(listingId: string ) {
    if (!(await this.isInBookmarks(listingId))){
      const bookmarks = await this.getBookmarks();
      bookmarks.push(listingId);
      const bookmarksParse = JSON.stringify(bookmarks);
      await Storage.set({key: 'bookmarks', value: bookmarksParse});
    }
  }

  async getBookmarks():Promise<string[]> {
    const bookmarks = (await Storage.get({key: 'bookmarks'})).value;
    const bookmarksParsed: string[] = JSON.parse(bookmarks);
    return bookmarksParsed || [];
  }

  async removeBookmark(listingId: string) {
    if ((await this.isInBookmarks(listingId))){
      const bookmarks = await this.getBookmarks();
      const i = bookmarks.findIndex((element) => element === listingId);
      bookmarks.splice(i, 1);
      await Storage.set({key: 'bookmarks', value: JSON.stringify(bookmarks)});
    }
  }

  async isInBookmarks(listingId: string ){
    const bookmarks = await this.getBookmarks();
    return bookmarks.includes(listingId)
  }


}
