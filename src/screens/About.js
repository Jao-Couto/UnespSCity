
import React, { Component } from "react";
import { StyleSheet, View, Text, TextInput } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import commonStyle from "../commonStyle";
import Header from "../components/Header";
import ModalSelector from "react-native-modal-selector-searchable";
import Icon from 'react-native-vector-icons/FontAwesome5'
import cidadeMenuService from "../services/cidadeMenuService";
import { connect } from "react-redux";
import ListPublicAreas from "../components/ListPublicAreas";
import { TouchableOpacity } from "react-native-gesture-handler";
import InputMasked from "../components/InputMasked";

class About extends Component {
    state = {
        type: '',
        dataCidades: [],
        errorType: '#fff',

        find: false
    }

    componentDidMount = () => {
        cidadeMenuService.subMenus(this.props.cityId)
            .then((res) => {
                let data = res.data.map((item) => {
                    return { key: item.id, label: item.name }
                })
                this.setState({ dataCidades: data })
            })
            .catch((err) => {
                console.log(err);
            })
    }

    listSolicits = () => {
        let error = false
        if (this.state.type == "") {
            this.setState({ errorType: "#fa9191" })
            error = true
        }
        if (!error) {
            this.props.route.params = { name: this.state.type }
            this.setState({ find: true })
        }
    }

    render() {
        return (
            <SafeAreaView style={styles.containerLogo} >
                <Header {...this.props}></Header>
                <View style={styles.container}>
                    <Text style={styles.title}>Solicitações</Text>
                    <ModalSelector
                        data={this.state.dataCidades}
                        supportedOrientations={['portrait']}
                        searchText="Procurar"
                        cancelText="Cancelar"
                        optionContainerStyle={{ backgroundColor: 'white', marginVertical: 40 }}
                        optionTextStyle={{ fontSize: 20, color: 'black' }}
                        initValueTextStyle={{ fontSize: 20, color: 'black' }}
                        style={{ backgroundColor: this.state.errorType }}
                        onChange={(option) => { this.setState({ type: option.label, errorType: "#fff" }) }}>
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
                                style={{
                                    fontFamily: commonStyle.fontFamily,
                                    marginLeft: 5,
                                    width: '85%',
                                    fontSize: 20,
                                    backgroundColor: this.state.errorType,
                                    color: '#000'
                                }}
                                placeholderTextColor="#aaa"
                                editable={false}
                                placeholder="Selecione um Serviço"
                                value={this.state.type} />
                        </View>
                    </ModalSelector>

                    <TouchableOpacity onPress={this.listSolicits} style={[styles.button]}>
                        <Text style={styles.buttonText}>Procurar</Text>
                    </TouchableOpacity>
                    {this.state.find && <ListPublicAreas {...this.props} nameService={this.state.type}></ListPublicAreas>}
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
        backgroundColor: commonStyle.colors.primary
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
    title: {
        fontFamily: commonStyle.fontFamily,
        fontSize: 30,
        color: commonStyle.colors.secundary,
        marginBottom: 10
    },
    button: {
        backgroundColor: commonStyle.colors.secundary,
        marginTop: 10,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    }, buttonText: {
        fontFamily: commonStyle.fontFamily,
        color: '#fff',
        fontSize: 20
    },

})


const mapStateToProps = ({ user }) => {
    return {
        ...user
    }
}

export default connect(mapStateToProps)(About)