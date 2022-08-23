import React, { Component } from "react";
import { StyleSheet, FlatList, Text, TouchableOpacity, View, Image } from 'react-native'
import commonStyle from "../commonStyle";
import { ListItem } from "react-native-elements";
import TouchableScale from 'react-native-touchable-scale';
import { typeService } from "../services/solicitacaoService";
import { showError } from '../common'
import cidadaoService from "../services/cidadaoService";
import 'intl';
import "intl/locale-data/jsonp/pt";

class ListAnimals extends Component {
    state = {
        animals: []
    }

    updateAreas = () => {
        typeService(this.props.route.params.name)
            .getAll()
            .then(async res => {
                let filtered = []
                await res.data.reduce((op, item) => {
                    return op.then(filteredNs => {
                        return new Promise(resolve => {
                            if (item.cityId == this.props.cityId) {
                                if (this.props.isAdmin) {
                                    cidadaoService.getCidadao(item.userId)
                                        .then(res => {
                                            item.userName = res.data.name
                                            resolve(filteredNs.concat(item))
                                        })
                                        .catch(err => {
                                            console.log(err);
                                        })

                                }

                                if (item.userId == this.props.userId) {
                                    item.userName = this.props.name
                                    resolve(filteredNs.concat(item))
                                }

                            }
                        });
                    });
                }, Promise.resolve([]))
                    .then(filteredNs => filtered = filteredNs);
                this.setState({ animals: filtered })
            }).catch(err => {
                console.log(err);
                showError(err)
            })
    }
    componentDidMount = () => {
        this.updateAreas()
    }

    getOptionsItem = ({ item: animal }) => {
        const items = animal.description.split(" - ")
        return (
            <ListItem
                onPress={() => this.props.navigation.navigate('InfoAnimal', { ...animal, updateAreas: this.updateAreas, nameService: this.props.route.params.name })}
                containerStyle={styles.item}
                Component={TouchableScale}
                friction={90} //
                tension={100} // These props are passed to the parent component (here TouchableScale)
                activeScale={0.95}  >
                {animal.images[0] != "" &&
                    <Image source={{ uri: animal.images[0] }} style={styles.logo} ></Image>
                }
                <ListItem.Content style={styles.content}>
                    <ListItem.Title style={styles.titleItens}>{items[0]}</ListItem.Title>
                    <ListItem.Title style={styles.titleItens}>{animal.isResolved ? "Adotado" : "Não Encontrado"}</ListItem.Title>
                    <ListItem.Subtitle style={styles.subtitleItens}>{items[2]} - {items[1]}</ListItem.Subtitle>
                    <ListItem.Subtitle style={styles.subtitleItens}>{items[4]} - {items[3]}</ListItem.Subtitle>
                    <ListItem.Subtitle style={styles.subtitleItens}>{animal.userName}, {items[5]}</ListItem.Subtitle>
                    <ListItem.Subtitle style={styles.subtitleItens}>{items[6]}</ListItem.Subtitle>
                    <ListItem.Subtitle style={styles.subtitleItens}>Última Vez Visto: {new Intl.DateTimeFormat('pt-BR', {
                        day: '2-digit',
                        month: '2-digit',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit'
                    }).format(new Date(animal.lastTimeSeen))}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem >
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    keyExtractor={animal => animal._id.toString()}
                    data={this.state.animals}
                    renderItem={this.getOptionsItem}
                    style={styles.list} />
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

export default ListAnimals