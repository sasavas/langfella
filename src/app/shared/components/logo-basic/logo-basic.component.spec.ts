import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoBasicComponent } from './logo-basic.component';

describe('LogoBasicComponent', () => {
  let component: LogoBasicComponent;
  let fixture: ComponentFixture<LogoBasicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoBasicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LogoBasicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
