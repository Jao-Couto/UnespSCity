import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import commonStyle from "../commonStyle";
import Header from "../components/Header";
import { connect } from 'react-redux'
import { Gravatar } from 'react-native-gravatar'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AuthInput from '../components/AuthInput'

class Profile extends Component {
    state = {
        edit: false,
        name: this.props.name,
        errorName: '',
        phone: this.props.phone,
        errorPhone: ''
    }

    editToggle = () => {
        this.setState({ edit: !this.state.edit })
    }

    render() {
        return (
            <SafeAreaView style={styles.containerLogo} >
                <Header {...this.props}></Header>
                <Gravatar options={{
                    email: this.props.email,
                    secure: true,
                    parameters: { "size": "200", "d": "mm" },
                }} style={styles.avatar} />
                <Text minimumFontScale={0.5} adjustsFontSizeToFit numberOfLines={1} style={styles.title}>{this.props.email}</Text>
                <TouchableOpacity onPress={this.editToggle}>
                    <Icon name='account-edit' size={30} color='#000'></Icon>
                </TouchableOpacity>
                <View style={styles.container}>

                    {this.state.edit ?
                        <KeyboardAvoidingView style={styles.formContainer} behavior={Platform.OS === 'ios' ? "padding" : "height"}>
                            <ScrollView >
                                <AuthInput
                                    icon='user'
                                    placeholder='Nome'
                                    value={this.state.name}
                                    style={styles.input}
                                    onChangeText={name => { this.setState({ name, errorName: '' }) }}
                                    error={this.state.errorName}
                                />
                                <AuthInput
                                    icon='mobile'
                                    placeholder='Telefone'
                                    value={this.state.phone}
                                    style={styles.input}
                                    onChangeText={phone => { this.setState({ phone, errorPhone: '' }) }}
                                    error={this.state.errorPhone}
                                />
                                <AuthInput
                                    icon='mobile'
                                    placeholder='Telefone'
                                    value={this.state.phone}
                                    style={styles.input}
                                    onChangeText={phone => { this.setState({ phone, errorPhone: '' }) }}
                                    error={this.state.errorPhone}
                                />
                                <AuthInput
                                    icon='mobile'
                                    placeholder='Telefone'
                                    value={this.state.phone}
                                    style={styles.input}
                                    onChangeText={phone => { this.setState({ phone, errorPhone: '' }) }}
                                    error={this.state.errorPhone}
                                />
                                <AuthInput
                                    icon='mobile'
                                    placeholder='Telefone'
                                    value={this.state.phone}
                                    style={styles.input}
                                    onChangeText={phone => { this.setState({ phone, errorPhone: '' }) }}
                                    error={this.state.errorPhone}
                                />
                                <AuthInput
                                    icon='mobile'
                                    placeholder='Telefone'
                                    value={this.state.phone}
                                    style={styles.input}
                                    onChangeText={phone => { this.setState({ phone, errorPhone: '' }) }}
                                    error={this.state.errorPhone}
                                />
                                <AuthInput
                                    icon='mobile'
                                    placeholder='Telefone'
                                    value={this.state.phone}
                                    style={styles.input}
                                    onChangeText={phone => { this.setState({ phone, errorPhone: '' }) }}
                                    error={this.state.errorPhone}
                                />
                                <AuthInput
                                    icon='mobile'
                                    placeholder='Telefone'
                                    value={this.state.phone}
                                    style={styles.input}
                                    onChangeText={phone => { this.setState({ phone, errorPhone: '' }) }}
                                    error={this.state.errorPhone}
                                />
                                <TouchableOpacity style={styles.buttonModify} onPress={() => this.setState({ edit: false })}>
                                    <Text style={styles.buttonText}>
                                        Salvar
                                    </Text>
                                </TouchableOpacity>
                            </ScrollView>
                        </KeyboardAvoidingView>
                        :

                        <View>
                            <Text style={styles.subTitle}> Nome: {this.props.name}</Text>
                            <Text style={styles.subTitle}> Telefone: {this.props.phone}</Text>
                            <Text style={styles.subTitle}> Rua: {this.props.phone}</Text>
                            <Text style={styles.subTitle}> Número: {this.props.phone}</Text>
                            <Text style={styles.subTitle}> Bairro: {this.props.phone}</Text>
                            <Text style={styles.subTitle}> Cidade: {this.props.phone}</Text>
                            <Text style={styles.subTitle}> Estado: {this.props.phone}</Text>
                            <Text style={styles.subTitle}> Nascimento: {this.props.phone}</Text>

                        </View>}
                    <StatusBar style="auto" />
                </View>
            </SafeAreaView >

        )
    }
}

const styles = StyleSheet.create({
    containerLogo: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: commonStyle.colors.primary,
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
        color: '#000',
        fontWeight: 'bold',
        fontSize: 30
    },
    subTitle: {
        fontFamily: commonStyle.fontFamily,
        color: '#000',
        fontSize: 20,
        marginBottom: 10
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 75
    },
    input: {
        marginTop: 10,
        backgroundColor: 'white',
    },
    formContainer: {
        backgroundColor: commonStyle.colors.primary,
        padding: 20,
        width: '90%'
    },
    button: {
        flexDirection: 'row',
        justifyContent: "space-around",
        width: '100%'
    },
    buttonModify: {
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
})

const mapStateToProps = ({ user }) => {
    return {
        email: user.email,
        name: user.name,
        phone: user.phone
    }
}

// export default Profile
export default connect(mapStateToProps)(Profile)