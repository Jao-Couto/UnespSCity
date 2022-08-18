import axios from "axios";
import { ServerMYSQL } from "../config"

class IluminacaoService {

    async create(data) {
        return axios({
            url: ServerMYSQL + "/api/create_street_lighting",
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

const iluminacaoService = new IluminacaoService()
export default iluminacaoService