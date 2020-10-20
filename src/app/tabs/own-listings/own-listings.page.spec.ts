import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { OwnListingsPage } from './own-listings.page';

describe('SearchPage', () => {
  let component: OwnListingsPage;
  let fixture: ComponentFixture<OwnListingsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OwnListingsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(OwnListingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
