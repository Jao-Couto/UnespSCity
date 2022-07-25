import cidadaoService from "../../services/cidadaoService"
import { USER_LOGGED_IN, USER_LOGGED_OUT } from "./actionType"

export const userLogged = user => {
    return {
        type: USER_LOGGED_IN,
        payload: user
    }
}

export const logout = () => {
    return {
        type: USER_LOGGED_OUT
    }
}

export const login = user => {
    return dispatch => {
        cidadaoService.loginCidadao(user)
            .then(res => {
                console.log("aqui", res.data.status == 200 && res.data.user.name);
                if (res.data.status == 200 && res.data.user.name) {
                    delete user.password
                    user = { ...res.data.user }
                    dispatch(userLogged(user))
                }
            })
            .catch(err => {
                console.log("ola");
                console.log(err);
            })
    }
}