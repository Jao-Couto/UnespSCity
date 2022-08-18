import axios from "axios";
import { ServerMYSQL } from "../config"

class LocaisUteisService {

    async create(data) {
        return axios({
            url: ServerMYSQL + "/api/locais_uteis",
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

const locaisUteisService = new LocaisUteisService()
export default locaisUteisService