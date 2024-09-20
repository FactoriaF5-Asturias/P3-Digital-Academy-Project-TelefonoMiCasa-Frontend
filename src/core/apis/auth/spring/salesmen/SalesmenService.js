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

}