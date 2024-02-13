import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslateDialogComponent } from './translate-dialog.component';

describe('TranslateDialogComponent', () => {
  let component: TranslateDialogComponent;
  let fixture: ComponentFixture<TranslateDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TranslateDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TranslateDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
