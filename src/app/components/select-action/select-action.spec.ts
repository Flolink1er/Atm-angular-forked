import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAction } from './select-action';

describe('SelectAction', () => {
  let component: SelectAction;
  let fixture: ComponentFixture<SelectAction>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectAction]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectAction);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
