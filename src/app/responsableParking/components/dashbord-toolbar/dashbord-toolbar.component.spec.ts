import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbordToolbarComponent } from './dashbord-toolbar.component';

describe('DashbordToolbarComponent', () => {
  let component: DashbordToolbarComponent;
  let fixture: ComponentFixture<DashbordToolbarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashbordToolbarComponent]
    });
    fixture = TestBed.createComponent(DashbordToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
