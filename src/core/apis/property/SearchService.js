export default class SearchService {
    constructor(repository) {
        this.repository = repository;
    }
    
    async search(type, action, address) { 
        try {
            const properties = await this.repository.searchByTypeAndAction(type, action, address); 
            return properties;
        } catch (error) {
            console.error('Error in SearchService:', error);
            throw new Error('Unable to fetch properties at the moment.');
        }
    }
}
