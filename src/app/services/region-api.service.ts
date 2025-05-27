import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Observable } from "rxjs";
import { AutocompleteRegionDto } from "../DTO/AutocompleteRegion.dto";
import { DepartementDto } from "../DTO/Departement.dto";
import { CityDto } from "../DTO/City.dto";

const env = environment;
const API_URL = `${env.settings.backend}`;

@Injectable({
  providedIn: 'root'
})
export class RegionApiService {
    private httpOptions = {
        headers: new HttpHeaders({ 
            'Content-Type': 'application/json',
        })
    };

    constructor(private http: HttpClient){
    }

    getRegionsName(region: string = ''): Observable<AutocompleteRegionDto[]> {
      console.log('getRegionsName called with:', region);
      return this.http.get<AutocompleteRegionDto[]>(API_URL + `/regions?nom=${region}`, this.httpOptions);
    }

    getDeptByRegions(codeRegion: string): Observable<DepartementDto[]> {
      return this.http.get<DepartementDto[]>(API_URL + `/regions/${codeRegion}/departements`, this.httpOptions);
    }

    getCitiesByDept(codeDept: string, nom: string = ''): Observable<CityDto[]> {
      return this.http.get<CityDto[]>(API_URL + `/departements/${codeDept}/communes`, this.httpOptions);
    }

}