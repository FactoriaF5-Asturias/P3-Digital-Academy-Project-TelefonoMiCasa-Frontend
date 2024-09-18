import { defineStore } from 'pinia';
import SearchService from '../core/apis/property/SearchService';
import SearchRepository from '../core/apis/property/SearchRepository';
const repository = new SearchRepository();
const searchService = new SearchService(repository);
export const useSearchStore = defineStore('search', {
    state: () => ({
        properties: [],
        loading: false,
        error: null
    }),
    actions: {
        async searchProperties(action) {
            this.loading = true;
            this.error = null;
            try {
                const result = await searchService.search(action);
                this.properties = result;
            } catch (error) {
                this.error = 'Error fetching properties. Please try again later.';
            } finally {
                this.loading = false;
            }
        }
    }
});