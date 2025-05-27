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

    /**
     * Récupération des régions par nom depuis l'API.
     * @param region 
     * @returns 
     */
    getRegionsName(region: string = ''): Observable<AutocompleteRegionDto[]> {
      return this.http.get<AutocompleteRegionDto[]>(API_URL + `/regions?nom=${region}`, this.httpOptions);
    }

    /**
     * Récupération des départements par région depuis l'API.
     * @param codeRegion 
     * @returns 
     */
    getDeptByRegions(codeRegion: string): Observable<DepartementDto[]> {
      return this.http.get<DepartementDto[]>(API_URL + `/regions/${codeRegion}/departements`, this.httpOptions);
    }

    /**
     * Récupération des villes par département depuis l'API.
     * @param codeDept 
     * @param nom 
     * @returns 
     */
    getCitiesByDept(codeDept: string, nom: string = ''): Observable<CityDto[]> {
      return this.http.get<CityDto[]>(API_URL + `/departements/${codeDept}/communes`, this.httpOptions);
    }

}