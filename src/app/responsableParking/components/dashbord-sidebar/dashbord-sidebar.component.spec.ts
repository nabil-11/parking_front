import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashbordSidebarComponent } from './dashbord-sidebar.component';

describe('DashbordSidebarComponent', () => {
  let component: DashbordSidebarComponent;
  let fixture: ComponentFixture<DashbordSidebarComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DashbordSidebarComponent]
    });
    fixture = TestBed.createComponent(DashbordSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
