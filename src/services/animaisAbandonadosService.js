import axios from "axios";
import { ServerMYSQL } from "../config"

class AnimaisAbandonadosService {

    async create(data) {
        return axios({
            url: ServerMYSQL + "/api/animais_abandonados",
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

const animaisAbandonadosService = new AnimaisAbandonadosService()
export default animaisAbandonadosService