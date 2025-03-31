import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DinventarioComponent } from './dinventario.component';

describe('DinventarioComponent', () => {
  let component: DinventarioComponent;
  let fixture: ComponentFixture<DinventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DinventarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DinventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
