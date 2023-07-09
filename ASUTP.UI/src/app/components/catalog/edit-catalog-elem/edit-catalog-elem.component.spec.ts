import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCatalogElemComponent } from './edit-catalog-elem.component';

describe('EditCatalogElemComponent', () => {
  let component: EditCatalogElemComponent;
  let fixture: ComponentFixture<EditCatalogElemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditCatalogElemComponent]
    });
    fixture = TestBed.createComponent(EditCatalogElemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
