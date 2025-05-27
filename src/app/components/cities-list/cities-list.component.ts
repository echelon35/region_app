import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, inject, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CityDto } from 'src/app/DTO/City.dto';
import { DepartementDto } from 'src/app/DTO/Departement.dto';
import { Filter } from 'src/app/DTO/Filter';
import { RegionApiService } from 'src/app/services/region-api.service';

@Component({
  selector: 'app-cities-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cities-list.component.html'
})
export class CitiesListComponent {
  @Input() dept: Observable<DepartementDto> = new Observable<DepartementDto>();
  cities: CityDto[] = [];
  private deptSubscription: Subscription = new Subscription();
  private cd = inject(ChangeDetectorRef);

  currentFilter = 'nom';
  currentOrder: 'ASC' | 'DESC' = 'ASC';
  filters: Filter[] = [
    { name: 'nom', order: 'ASC' },
    { name: 'code', order: 'ASC' },
    { name: 'population', order: 'ASC' },
    { name: 'codes_postaux', order: 'ASC' }
  ];

  constructor(private regionApiService: RegionApiService) {
  }

  ngOnInit(){
    this.deptSubscription = this.dept.subscribe((val) => this.findCities(val));
  }

  ngOnDestroy() {
    this.deptSubscription.unsubscribe();
  }

  findCities(dept: DepartementDto) {
    if(this.dept){
      this.regionApiService.getCitiesByDept(dept?.code).subscribe({
        next: (cities: CityDto[]) => {
          this.cities = cities;
          console.log('Cities fetched:', this.cities);
          this.cd.markForCheck();
        }});
    }
  }

  sortBy(filter: string){
    this.currentFilter = filter;
    this.currentOrder = (this.filters.find(f => f.name == filter)?.order === 'ASC') ? 'DESC' : 'ASC';
    this.filters.forEach(f => {
      if(f.name == filter){
        f.order = this.currentOrder;
      }else{
        f.order = 'ASC';
      }
    });
    this.cities.sort((a, b) => {
      const getValue = (city: CityDto) => {
        switch (filter) {
          case 'nom':
            return city.nom ?? '';
          case 'code':
            return city.code ?? '';
          case 'population':
            return city.population?.toString() ?? '';
          case 'codes_postaux':
            return Array.isArray(city.codesPostaux) ? city.codesPostaux.join(',') : (city.codesPostaux ?? '');
          default:
            return '';
        }
      };
      if (this.currentOrder === 'ASC') {
        return getValue(a).localeCompare(getValue(b));
      } else {
        return getValue(b).localeCompare(getValue(a));
      }
    });
  }
  
}
