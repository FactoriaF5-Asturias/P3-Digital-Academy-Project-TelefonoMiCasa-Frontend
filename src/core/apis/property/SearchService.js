export default class SearchService {
    constructor(repository) {
        this.repository = repository;
    }

    async search(action) {
        
        try {
            const properties = await this.repository.searchByAction(action);
            return properties;
        } catch (error) {
            console.error('Error in SearchService:', error);
            throw new Error('Unable to fetch properties at the moment.');
        }
    }
}