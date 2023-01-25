import React, { Component } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Dimensions, ScrollView, KeyboardAvoidingView, ActivityIndicator } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import commonStyle from "../commonStyle";
import AuthInput from '../components/AuthInput'
import { connect } from 'react-redux'
import { addMarker } from "../storage/actions/marker";
import { showError, showSuccess } from "../common";
import { typeService } from "../services/solicitacaoService";
import Icon from "react-native-vector-icons/Ionicons";

class AddInteracao extends Component {
    state = {
        description: '',
        errorDescription: '',
        loading: false,
    }



    solicit = () => {
        this.setState({ loading: true })
        const { description } = this.state
        let error = false
        if (description == '') {
            this.setState({ errorDescription: 'Descrição Obrigatória' })
            error = true
        }

        if (!error) {
            let data = {
                id: this.props.id,
                userId: this.props.userId,
                description,
                userName: this.props.name,
                date: new Date()
            }
            console.log(data);
            this.props.setHistory(data)
            typeService(this.props.type)
                .addHistory(data)
                .then(res => {
                    console.log(res.data);
                    if (res.data == false)
                        showSuccess("Erro false")
                    showSuccess('Solicitação feita com sucesso')
                }).catch(err => {
                    console.log(err);
                    showError(err)
                })
            this.props.showInteracao()
        } else
            showError("Campos obrigatórios não preenchidos")
        this.setState({ loading: false })

    }

    render() {
        return (
            <SafeAreaView style={styles.container}>
                <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
                    <TouchableOpacity onPress={() => this.props.showInteracao()}>
                        <Icon name="arrow-back" size={30} color="black" ></Icon>
                    </TouchableOpacity>
                    <Text style={styles.subTitle}>Adicionar Interação</Text>
                </View>
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior={Platform.OS === "ios" ? "padding" : "height"}>
                    <ScrollView style={{ width: '95%' }}>



                        <AuthInput
                            icon='file-text'
                            placeholder='Descrição'
                            value={this.state.description}
                            style={[styles.input, { height: 200 }]}
                            editable
                            maxLength={200}
                            multiline={true}
                            numberOfLines={8}
                            onChangeText={description => { this.setState({ description, errorDescription: '' }) }}
                            error={this.state.errorDescription}
                        />



                        <TouchableOpacity style={[styles.button]} onPress={this.solicit} disabled={this.state.loading}>
                            {this.state.loading &&
                                <ActivityIndicator size={"large"} color="white"></ActivityIndicator>
                                ||
                                <Text style={styles.buttonText}>
                                    Adicionar
                                </Text>
                            }
                        </TouchableOpacity>
                    </ScrollView>
                </KeyboardAvoidingView>

            </SafeAreaView>

        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: commonStyle.colors.primary
    },
    subTitle: {
        fontFamily: commonStyle.fontFamily,
        fontSize: 30,
        color: commonStyle.colors.title,
        flexWrap: "wrap"
    },
    text: {
        fontFamily: commonStyle.fontFamily,
        fontSize: 20,
        color: commonStyle.colors.title,
        textAlign: 'center',
        marginBottom: 10
    },
    formContainer: {
        backgroundColor: commonStyle.colors.primary,
        width: '100%',
        margin: 0,
        paddingBottom: 5
    },
    input: {
        marginTop: 10,
        backgroundColor: 'white'
    },
    button: {
        backgroundColor: commonStyle.colors.secundary,
        marginTop: 10,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        fontFamily: commonStyle.fontFamily,
        color: '#fff',
        fontSize: 20
    },
    buttonGroup: {
        flexDirection: 'row'
    },
    imageContainer: {
        width: '100%',
        height: Dimensions.get('window').height / 2,
        backgroundColor: '#eee',
        marginTop: 10,
        resizeMode: 'contain',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: Dimensions.get('window').height / 2,
        resizeMode: 'contain',
        backgroundColor: commonStyle.colors.primary
    },
    textError: {
        width: '100%',
        textAlign: 'center',
        fontFamily: commonStyle.fontFamily,
        color: '#f00',
        fontSize: 15,
        marginTop: 5,
        padding: 2,
        borderRadius: 5
    }
})


const mapStateToProps = ({ user, solicitado }) => {
    return {
        userId: user.userId,
        email: user.email,
        name: user.name,
        cityId: user.cityId,
        type: solicitado.type
    }
}


const mapDispatchToProps = dispatch => {
    return {
        addMarker: marker => dispatch(addMarker(marker))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddInteracao)
