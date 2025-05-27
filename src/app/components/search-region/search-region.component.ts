import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
import { AutocompleteRegionDto } from 'src/app/DTO/AutocompleteRegion.dto';
import { RegionApiService } from 'src/app/services/region-api.service';

@Component({
  standalone: true,
  imports: [FormsModule, CommonModule],
  selector: 'app-search-region',
  templateUrl: './search-region.component.html',
  styleUrls: ['./search-region.component.css']
})
export class SearchRegionComponent {
  
  private searchText$ = new BehaviorSubject<string>('');
  regionList: AutocompleteRegionDto[] = [];
  regions$: Observable<AutocompleteRegionDto[]> | undefined;
  autocompleteVisible: boolean = false;

  @Output() selectedRegion$ = new EventEmitter<AutocompleteRegionDto>();

  private cd = inject(ChangeDetectorRef)

  constructor(private regionApiService: RegionApiService) {
  }

  ngOnInit() {
    this.regions$ = this.searchText$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(regionSearched =>
              this.regionApiService.getRegionsName(regionSearched)));

    this.regions$.subscribe({
      next: (regions) => {
        this.regionList = regions;
        this.autocompleteVisible = this.searchText$.getValue().length > 0;
        this.updateView();
      }})
  }

  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  searchRegion(eventValue: string) {
    this.searchText$.next(eventValue);
    console.log('searchRegion called with:', eventValue);
  }

  /**
   * Update view
   */
  updateView(){
    this.cd.markForCheck();
  }

  selectRegion(region: AutocompleteRegionDto) {
    console.log('Region selected:', region);
    this.selectedRegion$.emit(region);
    this.autocompleteVisible = false;
    this.updateView();
  }

}
