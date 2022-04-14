import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Image, Platform, KeyboardAvoidingView } from 'react-native'
import { showError, showSuccess } from "../common";
import { SafeAreaView } from "react-native-safe-area-context";
import commonStyle from "../commonStyle";
import AuthInput from '../components/AuthInput'
import LogoUnesp from '../../assets/UnespLogo.png'
import { connect } from 'react-redux'
import { userLogged } from '../storage/actions/user'

class Login extends Component {
    state = {
        name: 'Temporario',
        email: '',
        errorEmail: '',
        password: '',
        errorPassword: '',
        phone: '18999999999'
    }



    signin = async () => {
        let error = false
        if (this.state.email.length <= 0) {
            this.setState({ errorEmail: 'Preencha o Email!' })
            error = true
        }
        if (this.state.password.length <= 0) {
            this.setState({ errorPassword: 'Preencha a Senha!' })
            error = true
        }

        if (!error)
            try {
                this.props.onLogin({ ...this.state })
            } catch (e) {
                showError(e)
            }
    }

    render() {
        return (
            <SafeAreaView style={styles.containerLogo} >
                <Image source={LogoUnesp} style={styles.image} />

                <View style={styles.container}>
                    <Text style={styles.title}>UnespSCity</Text>
                    <KeyboardAvoidingView style={styles.formContainer} behavior={Platform.OS === 'ios' ? "padding" : "height"}>
                        <Text style={styles.subTitle}>Informe seu login</Text>
                        <AuthInput
                            icon='at'
                            placeholder='Email'
                            value={this.state.email}
                            style={styles.input}
                            onChangeText={email => { this.setState({ email, errorEmail: '' }) }}
                            error={this.state.errorEmail}
                        />
                        <AuthInput
                            icon='lock'
                            placeholder='Senha'
                            value={this.state.password}
                            style={styles.input}
                            secureTextEntry={true}
                            onChangeText={password => { this.setState({ password, errorPassword: '' }) }}
                            error={this.state.errorPassword}
                        />
                        <TouchableOpacity onPress={this.signin}>
                            <View style={[styles.button]}>
                                <Text style={styles.buttonText}>
                                    Entrar
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </KeyboardAvoidingView>
                    <TouchableOpacity style={{ padding: 10 }}
                        onPress={() => { this.props.navigation.navigate('Register') }}>
                        <Text style={styles.subTitle}>Ainda não possui conta?</Text>
                    </TouchableOpacity>
                    <StatusBar style="auto" />
                </View>
            </SafeAreaView>

        )
    }
}

const styles = StyleSheet.create({
    containerLogo: {
        flex: 1,
        alignItems: 'flex-start',
        backgroundColor: commonStyle.colors.primary
    },
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: commonStyle.colors.primary
    },
    title: {
        fontFamily: commonStyle.fontFamily,
        fontSize: 70,
        color: commonStyle.colors.secundary,
        marginBottom: 10
    },
    subTitle: {
        fontFamily: commonStyle.fontFamily,
        fontSize: 20,
        color: '#555',
        textAlign: 'center',
        marginBottom: 10
    },
    formContainer: {
        backgroundColor: commonStyle.colors.primary,
        padding: 20,
        width: '90%'
    },
    input: {
        marginTop: 10,
        backgroundColor: 'white',
    },
    button: {
        backgroundColor: commonStyle.colors.secundary,
        marginTop: 10,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8
    },
    buttonText: {
        fontFamily: commonStyle.fontFamily,
        color: '#fff',
        fontSize: 20
    },
    image: {
        width: '100%',
        height: 50,
        resizeMode: 'contain'
    }
})

const mapDispatchToProps = dispatch => {
    return {
        onLogin: user => dispatch(userLogged(user))
    }
}

export default connect(null, mapDispatchToProps)(Login)