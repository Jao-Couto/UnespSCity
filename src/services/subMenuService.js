import axios from "axios";
import { ServerMYSQL } from "../config"

class SubMenuService {

    async subMenuCidade(data) {
        return axios({
            url: ServerMYSQL + "/api/submenu?menuId=" + data,
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

const subMenuService = new SubMenuService()
export default subMenuService