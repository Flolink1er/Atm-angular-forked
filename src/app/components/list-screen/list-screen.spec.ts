import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListScreen } from './list-screen';

describe('ListScreen', () => {
  let component: ListScreen;
  let fixture: ComponentFixture<ListScreen>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListScreen]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListScreen);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
