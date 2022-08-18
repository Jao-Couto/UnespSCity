import axios from "axios";
import { ServerMYSQL } from "../config"

class FocoEscorpiaoService {

    async create(data) {
        return axios({
            url: ServerMYSQL + "/api/foco_escorpiao",
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

const focoEscorpiaoService = new FocoEscorpiaoService()
export default focoEscorpiaoService