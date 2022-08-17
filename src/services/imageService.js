import axios from "axios";
import { ServerMYSQL } from "../config"

class ImageService {

    async addImage(data) {
        return axios({
            url: ServerMYSQL + "/api/image",
            method: "POST",
            timeout: 10000,
            data: data,
            headers: {
                'Content-Type': 'application/json',
                'Accept': '*/*',
            },
            maxContentLength: Infinity,
            maxBodyLength: Infinity
        }).then((res) => {
            return Promise.resolve(res)
        }).catch((err) => {
            return Promise.reject(err)
        })
    }

}

const imageService = new ImageService()
export default imageService