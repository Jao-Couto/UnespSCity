import axios from "axios";
import { ServerMYSQL } from "../config"

class LeishmanioseService {

    async create(data) {
        return axios({
            url: ServerMYSQL + "/api/leishmaniose",
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

const leishmanioseService = new LeishmanioseService()
export default leishmanioseService