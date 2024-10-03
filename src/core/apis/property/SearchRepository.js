import axios from 'axios';
import Property from '../../models/Property';

const API_URL = import.meta.env.VITE_API_ENDPOINT_TELEFONOMICASA;

export default class SearchRepository {
    constructor() {
        this.apiUrl = `${API_URL}/search/filter`; 
    }

    async searchByTypeAndAction(type, action, address) {
        try {
            const response = await axios.get(this.apiUrl, {
                params: { type, action, address } 
            });
            console.log('API Response:', response.data);
            return response.data.map(property => new Property(
                property.id,
                property.price,
                property.description,
                property.address,
                property.area,
                property.action,
                property.bedrooms,
                property.elevator,
                property.floor,
                property.bathrooms,
                property.house 
            ));
        } catch (error) {
            console.error('Error fetching properties:', error);
            return [];
        }
    }
}









