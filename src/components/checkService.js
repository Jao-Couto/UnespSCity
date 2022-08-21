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

class CheckService extends Component {
    state = {
        ...this.props.route.params
    }

    finalizar = () => {

        typeService(this.state.nameService)
            .updateResolved(this.state._id)
            .then(res => {
                this.setState({ isResolved: true })
                this.props.route.params.updateAreas()
            })
            .catch(err => { console.log(err); })
    }

    render() {
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
                            <ListItem.Title style={styles.titleItens}>{this.state.isResolved ? "Finalizada" : "Pendente"}</ListItem.Title>

                            <ListItem.Subtitle style={[styles.subtitleItens, { marginTop: 10 }]}>{this.state.street + ", " + this.state.streetNumber}</ListItem.Subtitle>
                            <ListItem.Subtitle style={styles.subtitleItens}>Ponto de Referência: {this.state.referencePoint}</ListItem.Subtitle>

                            <ListItem.Title style={[styles.titleItens, { marginTop: 10 }]}>Descrição</ListItem.Title>
                            <ListItem.Subtitle style={styles.subtitleItens}>{this.state.description}</ListItem.Subtitle>

                            <ListItem.Title style={[styles.titleItens, { marginTop: 10 }]}>Solicitado</ListItem.Title>
                            <ListItem.Subtitle style={styles.subtitleItens}>Em: {new Intl.DateTimeFormat('pt-BR', {
                                day: '2-digit',
                                month: '2-digit',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit'
                            }).format(new Date((this.state.date)))}</ListItem.Subtitle>
                            <ListItem.Subtitle style={styles.subtitleItens}>Por: {this.state.userId}</ListItem.Subtitle>

                        </ListItem.Content>
                    </ListItem >
                    {this.state.isAdmin && !this.state.isResolved ?
                        <TouchableOpacity style={[styles.button]} onPress={this.finalizar}>
                            <Text style={styles.buttonText}>
                                Finalizar
                            </Text>
                        </TouchableOpacity>
                        : null}
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
    }
})


const mapStateToProps = ({ user }) => {
    return {
        email: user.email,
        name: user.name,
        isAdmin: user.isAdmin
    }
}


// export default Profile
export default connect(mapStateToProps)(CheckService)
