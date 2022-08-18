import axios from "axios";
import { ServerMYSQL } from "../config"

class RadarDengueService {

    async create(data) {
        return axios({
            url: ServerMYSQL + "/api/radar_dengue",
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

const radarDengueService = new RadarDengueService()
export default radarDengueService