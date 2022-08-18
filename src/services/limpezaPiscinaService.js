import axios from "axios";
import { ServerMYSQL } from "../config"

class LimpezaPiscinaService {

    async create(data) {
        return axios({
            url: ServerMYSQL + "/api/limpeza_piscina",
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

const limpezaPiscinaService = new LimpezaPiscinaService()
export default limpezaPiscinaService