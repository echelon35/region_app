export class Filter {
    name: string;
    order: 'ASC' | 'DESC';
    type: 'string' | 'number' = 'string';

    constructor(name: string, order: 'ASC' | 'DESC') {
        this.name = name;
        this.order = order;
    }
}