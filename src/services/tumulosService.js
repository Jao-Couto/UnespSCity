import axios from "axios";
import { ServerMYSQL } from "../config"

class TumulosService {

    async create(data) {
        return axios({
            url: ServerMYSQL + "/api/tumulos",
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

const tumulosService = new TumulosService()
export default tumulosService