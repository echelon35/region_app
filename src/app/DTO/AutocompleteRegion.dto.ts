export class AutocompleteRegionDto {
    code = '';
    nom = '';
    _score = 0.0;

    constructor(obj: AutocompleteRegionDto) {
        if(obj){
            Object.assign(this, obj);
        }
    }
}