import { ref, reactive } from "vue";
import { defineStore } from "pinia";
import AuthService from "@/core/apis/spring/auth/AuthService";
import Credentials from "@/core/models/Credentials";

export const useAuthStore = defineStore('auth', () => {
    const user = ref({
        username: '',
        password: '',
        isAuthenticated: false,
        role: '',
        passwordChanged: false
    });

    function resetUser() {
        user.value = {
            username: '',
            password: '',
            isAuthenticated: false,
            role: '',
            passwordChanged: false
        };
    }

    async function login(username, password) {
        const credentials = new Credentials(username, password);
        const service = new AuthService(credentials);
        
        try {
            const response = await service.login();
            
            user.value.username = response.username;
            user.value.role = response.roles;
            user.value.isAuthenticated = true;
            user.value.passwordChanged = response.passwordChanged;
            
            return response;
        } catch (error) {
            console.error("Error en la autenticación:", error);
            throw error;
        }
    }

    function logout() {
        resetUser();
    }

    return { 
        user, 
        login,
        logout 
    };
});