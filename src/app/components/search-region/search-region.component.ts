import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, HostListener, inject, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BehaviorSubject, debounceTime, distinctUntilChanged, Observable, Subject, switchMap } from 'rxjs';
import { AutocompleteRegionDto } from 'src/app/DTO/AutocompleteRegion.dto';
import { RegionApiService } from 'src/app/services/region-api.service';

@Component({
  standalone: true,
  imports: [FormsModule, CommonModule],
  selector: 'kbr-search-region',
  templateUrl: './search-region.component.html'
})
export class SearchRegionComponent {
  
  public regionList: AutocompleteRegionDto[] = [];
  public autocompleteVisible: boolean = false;
  public regionName: string = '';
  private wasInside = false;
  private regions$: Observable<AutocompleteRegionDto[]> | undefined;
  public searchText$ = new BehaviorSubject<string>('');
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

  /**
   * Récupère la valeur de l'input de recherche.
   * @param event 
   * @returns valeur de l'input
   */
  getValue(event: Event): string {
    return (event.target as HTMLInputElement).value;
  }

  /**
   * Déclenche la recherche de régions en fonction de la valeur saisie.
   * @param eventValue 
   */
  searchRegion(eventValue: string) {
    this.searchText$.next(eventValue);
  }

  /**
   * Mise à jour du composant pour forcer la détection des changements.
   */
  updateView(){
    this.cd.markForCheck();
  }

  /**
   * Ouvre l'autocomplétion si l'utilisateur clique dans le champ de recherche.
   */
  @HostListener('click')
  clickIn() {
    this.autocompleteVisible = true;
    this.updateView();
    this.wasInside = true;
  }

  /**
   * Ferme l'autocomplétion si l'utilisateur clique en dehors du composant.
   */
  @HostListener('document:click')
  clickout() {
    if (!this.wasInside) {
      if(this.autocompleteVisible){
        this.autocompleteVisible = false;
        this.updateView();
      }
    }
    this.wasInside = false;
  }

  /**
   * Sélectionne une région dans la liste d'autocomplétion.
   * @param region 
   */
  selectRegion(region: AutocompleteRegionDto) {
    this.regionName = region.nom;
    this.selectedRegion$.emit(region);
    this.autocompleteVisible = false;
    this.updateView();
  }

}
