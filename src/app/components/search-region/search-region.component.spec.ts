import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchRegionComponent } from './search-region.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('SearchRegionComponent', () => {
  let component: SearchRegionComponent;
  let fixture: ComponentFixture<SearchRegionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [SearchRegionComponent],
    providers: [provideHttpClient()]
})
    .compileComponents();

    fixture = TestBed.createComponent(SearchRegionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
