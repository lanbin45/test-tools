import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProtocolDetailsComponent } from './protocol-details.component';

describe('ProtocolDetailsComponent', () => {
  let component: ProtocolDetailsComponent;
  let fixture: ComponentFixture<ProtocolDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProtocolDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProtocolDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
