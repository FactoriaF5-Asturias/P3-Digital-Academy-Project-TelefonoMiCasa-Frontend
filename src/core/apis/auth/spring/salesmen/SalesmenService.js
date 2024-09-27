import SalesmenRepository from "./SalesmenRepository"

export default class SalesmenService {

    #repo
    #credentials

    constructor(credentials) {
        this.#repo = new SalesmenRepository()
        this.#credentials = credentials
    }

    async login() {
        const response = await this.#repo.login(this.#credentials)
        return response
    }

    
    async registerSalesman(username, password) {
        const response = await this.#repo.registerSalesman(username, password)
        if (response.message === "Salesman created successfully!") {
            return this.getSalesmenList()
        } else {
            throw new Error(response.error || "Error registering salesman")
        }
    }

    
    async getSalesmenList() {
        const response = await this.#repo.getSalesmen()
        return response
    }
}