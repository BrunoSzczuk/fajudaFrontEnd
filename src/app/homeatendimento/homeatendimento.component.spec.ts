import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeatendimentoComponent } from './homeatendimento.component';

describe('HomeatendimentoComponent', () => {
  let component: HomeatendimentoComponent;
  let fixture: ComponentFixture<HomeatendimentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeatendimentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeatendimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
