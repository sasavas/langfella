import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadingListItemComponent } from './reading-list-item.component';

describe('ReadingListItemComponent', () => {
  let component: ReadingListItemComponent;
  let fixture: ComponentFixture<ReadingListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadingListItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReadingListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
