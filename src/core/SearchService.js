
export default class SearchService {
    constructor(repository) {
        this.repository = repository;
    }

    search(query) {
        return this.repository.search(query);
    }
}