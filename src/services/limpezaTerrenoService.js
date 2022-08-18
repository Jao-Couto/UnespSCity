import axios from "axios";
import { ServerMYSQL } from "../config"

class LimpezaTerrenoService {

    async create(data) {
        return axios({
            url: ServerMYSQL + "/api/limpeza_terreno",
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

const limpezaTerrenoService = new LimpezaTerrenoService()
export default limpezaTerrenoService