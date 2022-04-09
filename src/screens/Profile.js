import React, { Component } from "react";
import { StatusBar } from "expo-status-bar";
import { Text, StyleSheet, View, TouchableOpacity, Image, ScrollView } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import commonStyle from "../commonStyle";
import AuthInput from '../components/AuthInput'
import LogoUnesp from '../../assets/UnespLogo.png'

class Profile extends Component {
    state = {
        name: '',
        email: '',
        password: '',
        phone: '',
    }

    render() {
        return (
            <ScrollView>
                <SafeAreaView style={styles.containerLogo}>
                    <Image source={LogoUnesp} style={styles.image} />

                    <View style={styles.formContainer}>
                        <Text style={styles.subTitle}>Crie a sua conta</Text>

                        <AuthInput
                            icon='user'
                            placeholder='Nome'
                            value={this.state.name}
                            style={styles.input}
                            onChangeText={name => { this.setState({ name, errorName: '' }) }}
                            error={this.state.errorName}
                        />

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
                        <AuthInput
                            icon='asterisk'
                            placeholder='Confirmar Senha'
                            value={this.state.confirmPassword}
                            style={styles.input}
                            secureTextEntry={true}
                            onChangeText={confirmPassword => { this.setState({ confirmPassword, errorConfirmPassword: '' }) }}
                            error={this.state.errorConfirmPassword}
                        />

                        <AuthInput
                            icon='mobile'
                            placeholder='Celular'
                            value={this.state.phone}
                            style={styles.input}
                            secureTextEntry={true}
                            onChangeText={phone => { this.setState({ phone, errorPhone: '' }) }}
                            error={this.state.errorPhone}
                        />

                        <TouchableOpacity onPress={this.signup}>
                            <View style={[styles.button]}>
                                <Text style={styles.buttonText}>
                                    Cadastrar
                                </Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={{ padding: 10 }}
                        onPress={() => { this.props.navigation.navigate('Login'); }}>
                        <Text style={styles.subTitle}>Já possui conta?</Text>
                    </TouchableOpacity>
                    <StatusBar style="auto" />

                </SafeAreaView>
            </ScrollView>

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
        color: '#fff',
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
        color: '#000',
        fontSize: 20
    },
    image: {
        width: '100%',
        height: 50,
        resizeMode: 'contain'
    }
})


export default Profile