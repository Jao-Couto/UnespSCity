import axios from "axios";
import { ServerMYSQL } from "../config"

class MausTratosAnimaisService {

    async create(data) {
        return axios({
            url: ServerMYSQL + "/api/maus_tratos_animais",
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

const mausTratosAnimaisService = new MausTratosAnimaisService()
export default mausTratosAnimaisService