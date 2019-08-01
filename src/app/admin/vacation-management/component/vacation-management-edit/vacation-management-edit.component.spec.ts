import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VacationManagementEditComponent } from './vacation-management-edit.component';

describe('VacationManagementEditComponent', () => {
  let component: VacationManagementEditComponent;
  let fixture: ComponentFixture<VacationManagementEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VacationManagementEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VacationManagementEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
