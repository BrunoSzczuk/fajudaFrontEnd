import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LocaladdComponent } from './localadd.component';

describe('LocaladdComponent', () => {
  let component: LocaladdComponent;
  let fixture: ComponentFixture<LocaladdComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LocaladdComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocaladdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
