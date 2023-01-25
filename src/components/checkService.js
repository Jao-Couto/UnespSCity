import React, { Component } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Dimensions, ScrollView, Image } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import commonStyle from "../commonStyle";
import { ListItem } from "react-native-elements";
import Map from "./Map";
import { connect } from 'react-redux'
import { typeService } from "../services/solicitacaoService";
import 'intl';
import "intl/locale-data/jsonp/pt";
import { loadMarkers } from "../storage/actions/marker";
import AddInteracao from "../screens/AddInteracao";
import cidadaoService from "../services/cidadaoService";

class CheckService extends Component {
    state = {
        ...this.props.route.params,
        interacao: false,
        userName: ''
    }

    componentDidMount = () => {
        cidadaoService.getCidadao(this.state.userId)
            .then(res => {
                console.log(res.data.name);
                this.setState({ userName: res.data.name })
            })
            .catch(err => {
                console.log(err);
            })
    }

    finalizar = () => {

        typeService(this.props.type)
            .updateResolved(this.state._id)
            .then(res => {
                this.setState({ isResolved: true })
            })
            .catch(err => { console.log(err); })
    }

    updateAreas = () => {
        typeService(this.props.type)
            .getOne(this.props.id)
            .then(res => {
                this.setState({ history: res.data[0].history })
            }).catch(err => {
                console.log(err);
                showError(err)
            })
    }

    addInteracao = () => {
        this.updateAreas()
        this.setState({ interacao: !this.state.interacao })
    }

    excluir = () => {
        typeService(this.props.type)
            .delete(this.state._id)
            .then(res => {
                this.props.onLoadMarkers(this.props.cityId)
                this.props.navigation.pop()
            })
            .catch(err => { console.log(err); })
    }

    render() {
        console.log(this.props.route.params);
        if (this.state.interacao)
            return (<AddInteracao id={this.state._id} showInteracao={this.addInteracao} setHistory={(nhistory) => this.setState({ history: [...this.state.history, nhistory] })}></AddInteracao>)
        else
            return (
                <SafeAreaView style={styles.container}>
                    <Text style={styles.subTitle}>Informações Adicionais</Text>
                    <ScrollView style={{ width: '95%' }}>
                        <Map size={{ height: 250 }} coords={{ latitude: this.state.latitude, longitude: this.state.longitude }} markerName="Localização"></Map>
                        <ListItem
                            containerStyle={styles.item} >
                            {this.state.images[0] != "" &&
                                <Image source={{ uri: this.state.images[0] }} style={styles.logo} resizeMode="contain"></Image>
                            }
                            <ListItem.Content style={styles.content}>
                                {this.props.type == "Adoção de Áreas públicas" &&
                                    <ListItem.Title style={styles.titleItens}>{this.state.isResolved ? "Adotada" : "Disponível"}</ListItem.Title>
                                }
                                {this.props.type == "Conheça os Gestores" &&
                                    <ListItem.Title style={styles.titleItens}>{this.state.isResolved ? "Ex" : "Atual"}</ListItem.Title> || <ListItem.Title style={styles.titleItens}>{this.state.isResolved ? "Finalizada" : "Pendente"}</ListItem.Title>
                                }
                                {this.state.name &&
                                    <ListItem.Title style={styles.titleItens}>{this.state.name}</ListItem.Title>
                                }
                                <ListItem.Subtitle style={[styles.subtitleItens, { marginTop: 10 }]}>{this.state.street + ", " + this.state.streetNumber}</ListItem.Subtitle>
                                <ListItem.Subtitle style={styles.subtitleItens}>Ponto de Referência: {this.state.referencePoint}</ListItem.Subtitle>

                                <ListItem.Title style={[styles.titleItens, { marginTop: 10 }]}>Descrição</ListItem.Title>
                                <ListItem.Subtitle style={styles.subtitleItens}>{this.state.description}</ListItem.Subtitle>

                                <ListItem.Title style={[styles.titleItens, { marginTop: 10 }]}>Solicitado</ListItem.Title>
                                {this.state.date &&
                                    <ListItem.Subtitle style={styles.subtitleItens}>Em: {new Intl.DateTimeFormat('pt-BR', {
                                        day: '2-digit',
                                        month: '2-digit',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        second: '2-digit'
                                    }).format(new Date((this.state.date)))}</ListItem.Subtitle>
                                }
                                <ListItem.Subtitle style={styles.subtitleItens}>Por: {this.state.userName}</ListItem.Subtitle>

                                <ListItem.Title style={[styles.titleItens, { marginTop: 10 }]}>Histórico</ListItem.Title>

                                {this.state.history != undefined && this.state.history.map((item, index) => {
                                    return <View key={index} style={styles.historyInteration}>
                                        <ListItem.Subtitle style={styles.subtitleItens}>Funcionário: {item.userName}</ListItem.Subtitle>
                                        <ListItem.Subtitle style={styles.subtitleItens}>{item.description}</ListItem.Subtitle>
                                        <ListItem.Subtitle style={[styles.subtitleItens, { alignSelf: 'flex-end' }]}>{new Intl.DateTimeFormat('pt-BR', {
                                            day: '2-digit',
                                            month: '2-digit',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            second: '2-digit'
                                        }).format(new Date((item.date)))}</ListItem.Subtitle>
                                    </View>
                                })}


                            </ListItem.Content>
                        </ListItem >
                        {this.props.isAdmin && !this.state.isResolved && this.state.history != undefined ?
                            <TouchableOpacity style={[styles.button]} onPress={() => this.setState({ interacao: !this.state.interacao })}>
                                <Text style={styles.buttonText}>
                                    Executar Serviço
                                </Text>
                            </TouchableOpacity>
                            : null}
                        {this.props.isAdmin && !this.state.isResolved ?
                            <TouchableOpacity style={[styles.button]} onPress={this.finalizar}>
                                <Text style={styles.buttonText}>
                                    Finalizar
                                </Text>
                            </TouchableOpacity>
                            : null}
                        {this.props.isAdmin &&
                            <>

                                <TouchableOpacity style={[styles.button, { backgroundColor: 'red' }]} onPress={this.excluir}>
                                    <Text style={styles.buttonText}>
                                        Excluir
                                    </Text>
                                </TouchableOpacity>
                            </>
                        }
                    </ScrollView>

                </SafeAreaView >

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
        textAlign: 'center',
        marginBottom: 10
    },
    list: {
        width: '100%'
    },
    item: {
        flexDirection: 'column',
        borderBottomWidth: 1,
        borderColor: '#aaa',
        backgroundColor: commonStyle.colors.itens,
        marginBottom: 10
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
    logo: {
        resizeMode: 'contain',
        width: '100%',
        height: 200
    },
    titleItens: {
        fontFamily: commonStyle.fontFamily,
        color: '#000',
        fontSize: 20
    },
    subtitleItens: {
        fontFamily: commonStyle.fontFamily,
        color: '#555',
        fontSize: 15
    },
    content: {
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    historyInteration: {
        borderWidth: 1,
        padding: 10,
        marginVertical: 5,
        borderRadius: 10,
        width: '90%'
    }
})


const mapStateToProps = ({ user, solicitado }) => {
    return {
        ...user,
        type: solicitado.type
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLoadMarkers: (cityId) => dispatch(loadMarkers(cityId))
    }
}

// export default Profile
export default connect(mapStateToProps, mapDispatchToProps)(CheckService)
