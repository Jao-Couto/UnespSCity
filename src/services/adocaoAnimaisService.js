import axios from "axios";
import { ServerMYSQL } from "../config"

class AdocaoAnimaisService {

    async create(data) {
        return axios({
            url: ServerMYSQL + "/api/adocao_animais",
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

const adocaoAnimaisService = new AdocaoAnimaisService()
export default adocaoAnimaisService