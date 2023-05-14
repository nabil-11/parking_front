import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListParkingComponent } from './list-parking.component';

describe('ListParkingComponent', () => {
  let component: ListParkingComponent;
  let fixture: ComponentFixture<ListParkingComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ListParkingComponent]
    });
    fixture = TestBed.createComponent(ListParkingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
