import { ref, reactive } from "vue";
import { defineStore } from "pinia";
import AuthService from "@/core/apis/spring/auth/AuthService";
import Credentials from "@/core/models/Credentials";

export const useAuthStore = defineStore('auth', () => {
    const user = ref({
        username: '',
        password: '',
        isAuthenticated: false,
        role: '' 
    });

    async function login(username, password) {
        const credentials = new Credentials(username, password);
        const service = new AuthService(credentials);
        
        try {
            const response = await service.login();
            
            user.value.username = username;
            user.value.isAuthenticated = true;
            user.value.role = response.role;
            
            return response; 
        } catch (error) {
            console.error("Error en la autenticación:", error);
            throw error; 
        }
    }

    return { user, login };
});
