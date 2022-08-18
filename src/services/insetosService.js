import axios from "axios";
import { ServerMYSQL } from "../config"

class InsetosService {

    async create(data) {
        return axios({
            url: ServerMYSQL + "/api/insetos_roedores_caramujos",
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

const insetosService = new InsetosService()
export default insetosService