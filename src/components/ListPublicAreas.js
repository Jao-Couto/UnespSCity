import React, { Component } from "react";
import { StyleSheet, FlatList, Text, TouchableOpacity, View, Image } from 'react-native'
import commonStyle from "../commonStyle";
import { ListItem } from "react-native-elements";
import TouchableScale from 'react-native-touchable-scale';
import { typeService } from "../services/solicitacaoService";
import * as Location from 'expo-location';

class ListPublicAreas extends Component {
    state = {
        areas: []
    }

    componentDidMount = () => {
        typeService(this.props.route.params.name)
            .getAll()
            .then(res => {
                this.setState({ areas: res.data })
            }).catch(err => {
                console.log(err);
                showError(err)
            })
    }

    getOptionsItem = ({ item: area, index }) => {
        return (
            <ListItem
                onPress={() => this.props.navigation.navigate('InfoAnimal', area)}
                containerStyle={styles.item}
                Component={TouchableScale}
                friction={90} //
                tension={100} // These props are passed to the parent component (here TouchableScale)
                activeScale={0.95}
                key={index} >
                <Image source={{ uri: area.image }} style={styles.logo} ></Image>
                <ListItem.Content style={styles.content}>
                    <ListItem.Title style={styles.titleItens}>{area.isAdopted ? "Adotada" : "Disponível"}</ListItem.Title>
                    <ListItem.Subtitle style={styles.subtitleItens}>{area.street + ", " + area.streetNumber}</ListItem.Subtitle>
                    <ListItem.Subtitle style={styles.subtitleItens}>{area.cityId + " - " + area.uf}</ListItem.Subtitle>
                    <ListItem.Subtitle style={styles.subtitleItens}>{area.description}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem >
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    data={this.state.areas}
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

export default ListPublicAreas