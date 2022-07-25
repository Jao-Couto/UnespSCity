import axios from "axios";
import { ServerMYSQL } from "../config"

class CidadeService {

    async getCidades() {
        return axios({
            url: ServerMYSQL + "/api/cidade",
            method: "GET",
            timeout: 10000,
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

const cidadeService = new CidadeService()
export default cidadeService