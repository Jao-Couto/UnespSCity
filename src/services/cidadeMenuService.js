import axios from "axios";
import { ServerMYSQL } from "../config"

class CidadeMenuService {

    async menuCidade(data) {
        return axios({
            url: ServerMYSQL + "/api/menucidade?cityId=" + data,
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

    async subMenus(data) {
        return axios({
            url: ServerMYSQL + "/api/menucidade/submenu/" + data,
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

const cidadeMenuService = new CidadeMenuService()
export default cidadeMenuService