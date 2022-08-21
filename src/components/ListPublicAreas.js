import React, { Component } from "react";
import { StyleSheet, FlatList, View, Image } from 'react-native'
import commonStyle from "../commonStyle";
import { ListItem } from "react-native-elements";
import TouchableScale from 'react-native-touchable-scale';
import { typeService } from "../services/solicitacaoService";

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
        console.log(this.props.nameService);
        return (
            <ListItem
                onPress={() => this.props.navigation.navigate('CheckService', { nameService: this.props.nameService, ...area })}
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
                    <ListItem.Subtitle style={styles.subtitleItens}>{area.referencePoint + ", " + area.cityId}</ListItem.Subtitle>
                    <ListItem.Subtitle style={styles.subtitleItens}>{area.description}</ListItem.Subtitle>
                    <ListItem.Subtitle style={styles.subtitleItens}>{area.date}</ListItem.Subtitle>
                    <ListItem.Subtitle style={styles.subtitleItens}>{area.userId}</ListItem.Subtitle>
                    <ListItem.Subtitle style={styles.subtitleItens}>{area.guardian}</ListItem.Subtitle>
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