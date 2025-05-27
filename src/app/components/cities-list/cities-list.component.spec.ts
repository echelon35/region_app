import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CitiesListComponent } from './cities-list.component';
import { provideHttpClient } from '@angular/common/http';

describe('CitiesListComponent', () => {
  let component: CitiesListComponent;
  let fixture: ComponentFixture<CitiesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CitiesListComponent],
      providers: [provideHttpClient()]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CitiesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
