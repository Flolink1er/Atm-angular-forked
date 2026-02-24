import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LandingList } from './landing-list';

describe('LandingList', () => {
  let component: LandingList;
  let fixture: ComponentFixture<LandingList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LandingList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
