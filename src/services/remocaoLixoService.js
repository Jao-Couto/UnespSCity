import axios from "axios";
import { ServerMYSQL } from "../config"

class RemocaoLixoService {

    async create(data) {
        return axios({
            url: ServerMYSQL + "/api/remove-trash",
            method: "POST",
            timeout: 10000,
            data: data,
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
            }
        }).then((res) => {
            return Promise.resolve(res)
        }).catch((err) => {
            return Promise.reject(err)
        })
    }


    async getAll() {
        return axios({
            url: ServerMYSQL + "/api/remove-trash",
            method: "GET",
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
            }
        }).then((res) => {
            return Promise.resolve(res)
        }).catch((err) => {
            return Promise.reject(err)
        })
    }

    async getMarkers() {
        return axios({
            url: ServerMYSQL + "/api/remove-trash/markers",
            method: "GET",
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
            }
        }).then((res) => {
            return Promise.resolve(res)
        }).catch((err) => {
            return Promise.reject(err)
        })
    }

    async updateResolved(data) {
        return axios({
            url: ServerMYSQL + "/api/remove-trash/update_resolved/" + data,
            method: "PUT",
            timeout: 10000,
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
            }
        }).then((res) => {
            return Promise.resolve(res)
        }).catch((err) => {
            return Promise.reject(err)
        })
    }

}

const remocaoLixoService = new RemocaoLixoService()
export default remocaoLixoService