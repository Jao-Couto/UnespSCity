import axios from "axios";
import { ServerMYSQL } from "../config"

class AnimaisPerdidosService {

    async create(data) {
        return axios({
            url: ServerMYSQL + "/api/animais_perdidos",
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

const animaisPerdidosService = new AnimaisPerdidosService()
export default animaisPerdidosService