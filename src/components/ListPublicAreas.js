import React, { Component } from "react";
import { StyleSheet, FlatList, View, Image, Text } from 'react-native'
import commonStyle from "../commonStyle";
import { showError } from '../common'
import { ListItem } from "react-native-elements";
import TouchableScale from 'react-native-touchable-scale';
import { typeService } from "../services/solicitacaoService";
import 'intl';
import "intl/locale-data/jsonp/pt";

class ListPublicAreas extends Component {
    state = {
        areas: [],
        ready: false,
        type: this.props.route.params.name
    }

    updateAreas = () => {
        typeService(this.state.type)
            .getAll()
            .then(res => {
                const filtered = res.data.filter(item => {
                    if (item.cityId == this.props.cityId)
                        return item
                })
                console.log("filtro", filtered);
                this.setState({ areas: filtered }, () => this.setState({ ready: true }))
            }).catch(err => {
                console.log(err);
                showError(err)
            })
    }

    componentDidMount = () => {
        this.updateAreas()
    }

    getOptionsItem = ({ item: area, index }) => {

        return (
            <ListItem
                onPress={() => this.props.navigation.navigate('CheckService', { nameService: this.props.nameService, ...area, updateAreas: this.updateAreas })}
                containerStyle={styles.item}
                Component={TouchableScale}
                friction={90} //
                tension={100} // These props are passed to the parent component (here TouchableScale)
                activeScale={0.95}
                key={index} >
                {area.images[0] != "" &&
                    <Image source={{ uri: area.images[0] }} style={styles.logo} ></Image>
                }
                <ListItem.Content style={styles.content}>
                    <ListItem.Title style={styles.titleItens}>{area.isResolved ? "Finalizada" : "Pendente"}</ListItem.Title>
                    <ListItem.Subtitle style={styles.subtitleItens}>{area.street + ", " + area.streetNumber}</ListItem.Subtitle>
                    <ListItem.Subtitle style={styles.subtitleItens}>Ponto de referência: {area.referencePoint}</ListItem.Subtitle>
                    <ListItem.Subtitle style={styles.subtitleItens}>{area.description}</ListItem.Subtitle>
                    <ListItem.Subtitle style={styles.subtitleItens}>{area.date}</ListItem.Subtitle>
                    <ListItem.Subtitle style={styles.subtitleItens}>{area.userId}</ListItem.Subtitle>
                    <ListItem.Subtitle style={styles.subtitleItens}>{area.guardian}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem >
        )
    }

    getOfertas = ({ item: area, index }) => {

        return (
            <ListItem
                onPress={() => this.props.navigation.navigate('CheckService', { nameService: this.props.nameService, ...area, updateAreas: this.updateAreas })}
                containerStyle={styles.item}
                Component={TouchableScale}
                friction={90} //
                tension={100} // These props are passed to the parent component (here TouchableScale)
                activeScale={0.95}
                key={index} >
                {area.images[0] != "" &&
                    <Image source={{ uri: area.images[0] }} style={styles.logo} ></Image>
                }
                <ListItem.Content style={styles.content}>
                    <ListItem.Title style={styles.titleItens}>{area.name}</ListItem.Title>

                    <ListItem.Subtitle style={[styles.subtitleItens, { marginTop: 10 }]}>{area.street + ", " + area.streetNumber}</ListItem.Subtitle>
                    <ListItem.Subtitle style={styles.subtitleItens}>Ponto de Referência: {area.referencePoint}</ListItem.Subtitle>

                    <ListItem.Title style={[styles.titleItens, { marginTop: 10 }]}>Descrição</ListItem.Title>
                    <ListItem.Subtitle style={styles.subtitleItens}>{area.description}</ListItem.Subtitle>
                    <ListItem.Subtitle style={styles.subtitleItens}>{area.date}</ListItem.Subtitle>
                    <ListItem.Subtitle style={styles.subtitleItens}>R${area.preco}</ListItem.Subtitle>


                </ListItem.Content>
            </ListItem >
        )
    }

    render() {
        return (
            <View style={styles.container}>
                {this.state.ready && this.state.areas.length > 0 &&
                    <FlatList
                        keyExtractor={option => option._id.toString()}
                        data={this.state.areas}
                        renderItem={this.state.type == "Ofertas Locais" ? this.getOfertas : this.getOptionsItem}
                        style={styles.list} />
                }
                {this.state.areas.length == 0 &&
                    <Text style={[styles.titleItens, { fontWeight: 'bold' }]}>Nada Encontrado</Text>}
            </View>

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

export default ListPublicAreas