import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangepassDialogeComponent } from './changepass-dialoge.component';

describe('ChangepassDialogeComponent', () => {
  let component: ChangepassDialogeComponent;
  let fixture: ComponentFixture<ChangepassDialogeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ChangepassDialogeComponent]
    });
    fixture = TestBed.createComponent(ChangepassDialogeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
