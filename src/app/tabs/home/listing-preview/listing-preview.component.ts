import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { IListingOverview } from 'src/shared/interfaces/listing/listingOverview.interface';
import { ListingComponent } from '../../listing/listing.component';

@Component({
  selector: 'rubo-listing-preview',
  templateUrl: './listing-preview.component.html',
  styleUrls: ['./listing-preview.component.scss'],
})
export class ListingPreviewComponent implements OnInit {

  @Input() listingData: IListingOverview;

  constructor(private readonly _modal: ModalController) { }

  ngOnInit() {}

  async openListing() {
    console.log('Open')
    const modal = await this._modal.create({
      component: ListingComponent,
      componentProps: {
        listingId: this.listingData.listingId
      }
    })
    modal.present();
  }

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

}
