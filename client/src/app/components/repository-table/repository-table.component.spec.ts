import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RepositoryTableComponent } from './repository-table.component';

describe('TableListComponent', () => {
  let component: RepositoryTableComponent;
  let fixture: ComponentFixture<RepositoryTableComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepositoryTableComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepositoryTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
