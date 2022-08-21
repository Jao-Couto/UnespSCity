import axios from "axios";
import { ServerMYSQL } from "../config"

class CidadaoService {

    async loginCidadao(data) {
        return axios({
            url: ServerMYSQL + "/api/cidadao/login",
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

    async cadastroCidadao(data) {
        return axios({
            url: ServerMYSQL + "/api/cidadao",
            method: "POST",
            timeout: 10000,
            data: data,
        }).then((res) => {
            return Promise.resolve(res)
        }).catch((err) => {
            return Promise.reject(err)
        })
    }

    async updateCidadao(data) {
        return axios({
            url: ServerMYSQL + "/api/updateOne_cidadao",
            method: "PUT",
            timeout: 10000,
            data: data,
        }).then((res) => {
            return Promise.resolve(res)
        }).catch((err) => {
            return Promise.reject(err)
        })
    }



}

const cidadaoService = new CidadaoService()
export default cidadaoService