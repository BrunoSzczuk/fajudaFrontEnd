import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TipoatendimentoaddComponent } from './tipoatendimentoadd.component';

describe('TipoatendimentoaddComponent', () => {
  let component: TipoatendimentoaddComponent;
  let fixture: ComponentFixture<TipoatendimentoaddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TipoatendimentoaddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TipoatendimentoaddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
