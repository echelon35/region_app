export class CityDto {
    code: string = '';
    nom: string = '';
    codeDepartement: string = '';
    siren: string = '';
    codeEpci: string = '';
    codeRegion: string = '';
    codesPostaux: string[] = [];
    population: number = 0;

    constructor(obj?: Partial<CityDto>) {
        if (obj) {
            Object.assign(this, obj);
        }
    }
}