import { Alert } from "react-native"
import { showError } from "../../common"
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
                if (res.data.data == undefined)
                    showError("Email ou senha incorretos!")
                if (res.data.status == 200 && res.data.data.name) {
                    delete user.password
                    user = { ...res.data.data }
                    dispatch(userLogged(user))
                }
            })
            .catch(err => {
                Alert.alert("Email/Senha incorreto!", "Verifique seu email ou senha e tente novamente")
            })
    }
}