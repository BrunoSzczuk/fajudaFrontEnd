import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeAtendimentoComponent } from './homeatendimento.component';

describe('HomeatendimentoComponent', () => {
  let component: HomeAtendimentoComponent;
  let fixture: ComponentFixture<HomeAtendimentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeAtendimentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeAtendimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
