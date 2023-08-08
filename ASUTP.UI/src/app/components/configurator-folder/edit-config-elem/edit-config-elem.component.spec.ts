import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditConfigElemComponent } from './edit-config-elem.component';

describe('EditConfigElemComponent', () => {
  let component: EditConfigElemComponent;
  let fixture: ComponentFixture<EditConfigElemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditConfigElemComponent]
    });
    fixture = TestBed.createComponent(EditConfigElemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
