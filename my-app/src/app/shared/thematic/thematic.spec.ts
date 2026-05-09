import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Thematic } from './thematic';

describe('Thematic', () => {
  let component: Thematic;
  let fixture: ComponentFixture<Thematic>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Thematic],
    }).compileComponents();

    fixture = TestBed.createComponent(Thematic);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
