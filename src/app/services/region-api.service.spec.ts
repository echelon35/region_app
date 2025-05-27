import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { RegionApiService } from './region-api.service';
import { AutocompleteRegionDto } from '../DTO/AutocompleteRegion.dto';
import { environment } from 'src/environments/environment';
import { provideHttpClient } from '@angular/common/http';

const env = environment;
const API_URL = `${env.settings.backend}`;

describe('RegionApiService', () => {
  let service: RegionApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RegionApiService, provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(RegionApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch regions from GeoAPI', () => {
    const mockRegions: AutocompleteRegionDto[] = [
        {
            nom: "Auvergne-Rhône-Alpes",
            code: "84",
            _score: 0.6084756400700411
        }
    ];
    service.getRegionsName('auv').subscribe((regions) => {
      expect(regions).toEqual(mockRegions);
    });

    const req = httpMock.expectOne(API_URL + '/regions?nom=auv');
    expect(req.request.method).toBe('GET');
    req.flush(mockRegions);
  });

});