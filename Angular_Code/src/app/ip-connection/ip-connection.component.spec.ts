import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IPConnectionComponent } from './ip-connection.component';

describe('IPConnectionComponent', () => {
  let component: IPConnectionComponent;
  let fixture: ComponentFixture<IPConnectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IPConnectionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(IPConnectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
