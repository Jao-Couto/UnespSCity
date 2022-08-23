import React, { Component } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, TextInput } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import commonStyle from "../commonStyle";
import Header from "../components/Header";
import { connect } from 'react-redux'
import { Gravatar } from 'react-native-gravatar'
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import AuthInput from '../components/AuthInput'
import InputMasked from "../components/InputMasked";
import ModalSelector from "react-native-modal-selector-searchable";
import cidadeService from "../services/cidadeService";
import { CheckBox } from "react-native-elements";
import cidadaoService from "../services/cidadaoService";
import { showError, showSuccess } from "../common";
import { userLogged } from "../storage/actions/user";



class Profile extends Component {
    initialState = {
        name: this.props.name,
        errorName: '',
        mobilePhone: this.props.mobilePhone,
        errorPhone: '',
        email: this.props.email,
        errorEmail: '',

        cityId: this.props.cityId,
        cityName: '',
        errorCityId: '#fff',
        panicButton: this.props.panicButton

    }

    state = {
        edit: false,

        dataCidades: [],
        ...this.initialState
    }



    componentDidMount = () => {
        cidadeService.getCidades()
            .then((res) => {
                let data = res.data.map((item) => {
                    if (item.id == this.props.cityId) {
                        this.setState({ cityName: item.name })
                        this.initialState.cityName = item.name
                    }
                    return { key: item.id, label: item.name }
                })

                this.setState({ dataCidades: data })
            })
            .catch((err) => {
                console.log(err);
            })
    }

    editToggle = () => {
        this.setState({ edit: !this.state.edit })
        if (!this.state.edit == false) {
            this.setState({
                ...this.initialState
            })
        }
    }

    update = () => {
        let error = false
        if (this.state.name.length <= 0) {
            this.setState({ errorName: 'Preencha o Nome!' })
            error = true
        }
        if (this.state.email.length <= 0) {
            this.setState({ errorEmail: 'Preencha o Email!' })
            error = true
        }
        if (this.state.cityId.length <= 0) {
            this.setState({ errorCityId: '#fa9191' })
            error = true
        }
        if (!error) {
            const data = {
                id: this.props.userId,
                name: this.state.name,
                email: this.state.email,
                mobilePhone: this.state.mobilePhone,
                cityId: this.state.cityId,
                panicButton: this.state.panicButton
            }
            cidadaoService.updateCidadao(data)
                .then(res => {
                    console.log(res.data);
                    this.props.attUser(data)
                    this.setState({ edit: false })
                    showSuccess('Atualizado com Sucesso')

                })
                .catch(err => {
                    console.log(err);
                    showError(err)
                })
        }

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
                <TouchableOpacity onPress={this.editToggle} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 10, backgroundColor: commonStyle.colors.secundary, padding: 10, borderRadius: 8 }}>
                    <Icon name='account-edit' size={30} color='#fff'></Icon>
                    <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
                <View style={styles.container}>


                    <KeyboardAvoidingView style={styles.formContainer} behavior={Platform.OS === 'ios' ? "padding" : "height"}>
                        <ScrollView >
                            <AuthInput
                                icon='user'
                                placeholder='Nome'
                                value={this.state.name}
                                style={[styles.input, this.state.edit ? null : { backgroundColor: '#ccc' }]}
                                onChangeText={name => { this.setState({ name, errorName: '' }) }}
                                error={this.state.errorName}
                                editable={this.state.edit}
                            />
                            <InputMasked
                                icon='mobile'
                                placeholder="Celular"
                                placeholderTextColor={"#aaa"}
                                type={'cel-phone'}
                                options={{
                                    maskType: 'BRL',
                                    withDDD: true,
                                    dddMask: '(99) '
                                }}
                                value={this.state.mobilePhone}
                                onChangeText={mobilePhone => { this.setState({ mobilePhone, errorPhone: '' }) }}
                                error={this.state.errorPhone}
                                editable={this.state.edit}

                                style={this.state.edit ? { backgroundColor: 'white', fontSize: 20 } : { backgroundColor: '#ccc', fontSize: 20 }}
                            />
                            <AuthInput
                                icon='at'
                                placeholder='Email'
                                value={this.state.email}
                                style={[styles.input, this.state.edit ? null : { backgroundColor: '#ccc' }]}
                                onChangeText={email => { this.setState({ email, errorEmail: '' }) }}
                                error={this.state.errorEmail}
                                editable={this.state.edit}
                            />

                            <ModalSelector
                                data={this.state.dataCidades}
                                initValue="Selecione uma Cidade"
                                supportedOrientations={['portrait']}
                                searchText="Procurar"
                                cancelText="Cancelar"
                                optionContainerStyle={{ backgroundColor: 'white', marginVertical: 40 }}
                                optionTextStyle={{ fontSize: 20, color: 'black' }}
                                initValueTextStyle={{ fontSize: 20, color: 'black' }}
                                style={this.state.edit ? { backgroundColor: this.state.errorCityId } : { backgroundColor: '#ccc' }}
                                onChange={(option) => { this.setState({ cityName: option.label, cityId: option.key, errorCityId: '#fff' }) }}
                                selectedKey={this.props.cityId}
                                disabled={!this.state.edit}>
                                <View style={{
                                    width: '100%',
                                    height: 50,
                                    borderRadius: 2,
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                }}>
                                    <View style={styles.icon}>
                                        <Icon name="city" size={20} color='#fff' />
                                    </View>
                                    <TextInput
                                        style={[{
                                            fontFamily: commonStyle.fontFamily,
                                            marginLeft: 5,
                                            width: '85%',
                                            fontSize: 20,
                                            color: '#000'
                                        }, this.state.edit ? { backgroundColor: this.state.errorCityId } : { backgroundColor: '#ccc' }]}

                                        placeholderTextColor="#aaa"
                                        editable={false}
                                        placeholder="Selecione uma Cidade"
                                        value={this.state.cityName} />
                                </View>
                            </ModalSelector>
                            <CheckBox
                                center
                                title="Botão de Pânico"
                                checked={this.state.panicButton}
                                onPress={() => this.setState({ panicButton: !this.state.panicButton })}
                                containerStyle={[{ marginVertical: 40 }, , this.state.edit ? { backgroundColor: 'white' } : { backgroundColor: '#ccc' }]}
                            />
                            {this.state.edit &&
                                <TouchableOpacity style={styles.buttonModify} onPress={this.update}>
                                    <Text style={styles.buttonText}>
                                        Salvar
                                    </Text>
                                </TouchableOpacity>
                            }
                        </ScrollView>
                    </KeyboardAvoidingView>

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
    icon: {
        color: '#333',
        flex: 1,
        height: '100%',
        backgroundColor: commonStyle.colors.secundary,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 2,
        borderBottomLeftRadius: 2
    },
})

const mapStateToProps = ({ user }) => {
    return {
        ...user
    }
}

const mapDispatchToProps = dispatch => {
    return {
        attUser: user => dispatch(userLogged(user))
    }
}



export default connect(mapStateToProps, mapDispatchToProps)(Profile)