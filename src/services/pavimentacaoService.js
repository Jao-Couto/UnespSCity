import axios from "axios";
import { ServerMYSQL } from "../config"

class PavimentacaoService {

    async create(data) {
        return axios({
            url: ServerMYSQL + "/api/create_paviment",
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

}

const pavimentacaoService = new PavimentacaoService()
export default pavimentacaoService