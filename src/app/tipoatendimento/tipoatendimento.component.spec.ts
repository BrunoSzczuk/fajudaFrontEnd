import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoatendimentoComponent } from './tipoatendimento.component';

describe('TipoatendimentoComponent', () => {
  let component: TipoatendimentoComponent;
  let fixture: ComponentFixture<TipoatendimentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoatendimentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoatendimentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
