import { ref, reactive } from "vue";
import { defineStore } from "pinia";
import Credentials from "@/core/models/Credentials";
import SalesmenService from "@/core/apis/auth/spring/salesmen/SalesmenService";


export const usesalesmenRigesterStore = defineStore('auth', () => {

    const user = ref(
        {
            username: 'salesmen',
            password: 'my-password',
            isAuthenticated: false
        }
    )

    function login(username, password) {
        const encodePassword = window.btoa("password")       
        const credentials = new Credentials(username, password)
        const service = new SalesmenService(credentials)
        return service.login()

    }

    return { user, login }
})