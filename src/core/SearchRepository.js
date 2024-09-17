
export default class SearchServiceRepository {
    constructor() {
        this.properties = [
            { id: 1, name: 'Casa en la playa', price: '€500,000' },
            { id: 2, name: 'piso en la ciudad', price: '€300,000' },
           
        ];
    }

    search(query) {
        return this.properties.filter(property =>
            property.name.toLowerCase().includes(query.toLowerCase())
        );
    }
}