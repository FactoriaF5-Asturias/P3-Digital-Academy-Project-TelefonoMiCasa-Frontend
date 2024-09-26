import axios from "axios";

export default class SalesmenRepository {
    constructor() {
        this.baseUrl = import.meta.env.VITE_API_ENDPOINT_TELEFONOMICASA;  
    }

    async login(credentials) {
        try {
            const response = await axios.get(this.baseUrl + '/login', {
                auth: {
                    "username": credentials.getUsername(),
                    "password": credentials.getPassword()
                },
                withCredentials: true
            });

            const data = await response.data;
            return data;
        } catch (error) {
            return error.toJSON();
        }
    }


    async registerSalesman(username, password) {
        try {
            const response = await axios.post(this.baseUrl + '/salesmen', {
                username,
                password
            });
            return response.data;
        } catch (error) {
            return error.toJSON();
        }
    }

    
    async getSalesmen() {
        try {
            const response = await axios.get(this.baseUrl + '/salesmen');
          
            return response.data;
        } catch (error) {
            return error.toJSON();

        }
    }
}
