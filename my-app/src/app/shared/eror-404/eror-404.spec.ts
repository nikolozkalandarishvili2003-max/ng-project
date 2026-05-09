import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Eror404 } from './eror-404';

describe('Eror404', () => {
  let component: Eror404;
  let fixture: ComponentFixture<Eror404>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Eror404],
    }).compileComponents();

    fixture = TestBed.createComponent(Eror404);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
