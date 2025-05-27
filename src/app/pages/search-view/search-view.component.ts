import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, inject } from '@angular/core';
import { Subject } from 'rxjs';
import { CitiesListComponent } from 'src/app/components/cities-list/cities-list.component';
import { SearchRegionComponent } from 'src/app/components/search-region/search-region.component';
import { AutocompleteRegionDto } from 'src/app/DTO/AutocompleteRegion.dto';
import { DepartementDto } from 'src/app/DTO/Departement.dto';
import { RegionApiService } from 'src/app/services/region-api.service';

@Component({
  standalone: true,
  imports: [SearchRegionComponent, CommonModule, CitiesListComponent],
  templateUrl: './search-view.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchViewComponent {

  public selectedRegion: AutocompleteRegionDto | undefined;
  public depts: DepartementDto[] = [];
  private cd = inject(ChangeDetectorRef);
  public selectedDept: DepartementDto | undefined;
  deptSubject: Subject<DepartementDto> = new Subject<DepartementDto>();

  constructor(private regionApiService: RegionApiService) {
  }

  getSelectedRegion(region: AutocompleteRegionDto) {
    if(region && region.nom) {
      this.selectedRegion = region;
      this.regionApiService.getDeptByRegions(region.code).subscribe({
        next: (departements) => {
          this.depts = departements;
          this.cd.markForCheck();
        }});
    }
  }

  selectDept(dept: DepartementDto) {
    console.log('Selected Department:', dept);
    this.selectedDept = dept;
    this.deptSubject.next(dept);
    this.cd.markForCheck();
  }
  

}
