export class Filter {
    name: string;
    order: 'ASC' | 'DESC';

    constructor(name: string, order: 'ASC' | 'DESC') {
        this.name = name;
        this.order = order;
    }
}