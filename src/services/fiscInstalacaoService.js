import axios from "axios";
import { ServerMYSQL } from "../config"

class FiscInstalacaoService {

    async create(data) {
        return axios({
            url: ServerMYSQL + "/api/facilities_inspection",
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

const fiscInstalacaoService = new FiscInstalacaoService()
export default fiscInstalacaoService