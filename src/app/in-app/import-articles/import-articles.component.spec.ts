import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportArticlesComponent } from './import-articles.component';

describe('ImportArticlesComponent', () => {
  let component: ImportArticlesComponent;
  let fixture: ComponentFixture<ImportArticlesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ImportArticlesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImportArticlesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
