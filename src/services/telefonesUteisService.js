import axios from "axios";
import { ServerMYSQL } from "../config"

class TelefonesUteisService {

    async create(data) {
        return axios({
            url: ServerMYSQL + "/api/useful_contacts",
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

const telefonesUteisService = new TelefonesUteisService()
export default telefonesUteisService