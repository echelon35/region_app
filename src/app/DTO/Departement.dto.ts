export class DepartementDto {
    code: string = '';
    nom: string = '';
    code_region: string = '';

    constructor(obj?: Partial<DepartementDto>) {
        if (obj) {
            Object.assign(this, obj);
        }
    }
}