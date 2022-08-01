import axios from "axios";
import { ServerMYSQL } from "../config"

class PracaService {

    async addPracaSolicit(data) {
        return axios({
            url: ServerMYSQL + "/api/praca",
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

const pracaService = new PracaService()
export default pracaService