import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCatalogElemComponent } from './add-catalog-elem.component';

describe('AddCatalogElemComponent', () => {
  let component: AddCatalogElemComponent;
  let fixture: ComponentFixture<AddCatalogElemComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCatalogElemComponent]
    });
    fixture = TestBed.createComponent(AddCatalogElemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
