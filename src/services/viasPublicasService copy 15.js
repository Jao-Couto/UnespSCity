import axios from "axios";
import { ServerMYSQL } from "../config"

class ViasPublicasService {

    async create(data) {
        return axios({
            url: ServerMYSQL + "/api/public_roads",
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

const viasPublicasService = new ViasPublicasService()
export default viasPublicasService