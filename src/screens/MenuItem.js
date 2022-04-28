import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, FlatList, Text, TouchableOpacity } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import commonStyle from "../commonStyle";
import { Avatar, ListItem } from "react-native-elements";
import TouchableScale from 'react-native-touchable-scale';
import Icon from "react-native-vector-icons/FontAwesome";

class MenuItens extends Component {
    state = {
        starred: []
    }

    componentDidMount = () => {
        let inicial = []
        let starred = this.props.route.params.itens.reduce(
            (previousValue, currentValue) => [...previousValue, false], inicial
        )
        console.log(starred);
        this.setState({
            starred
        })
    }

    setStarred = (id) => {
        let starred = this.state.starred
        starred[id - 1] = !starred[id - 1]
        this.setState({
            starred
        })
    }

    getOptionsItem = ({ item: opt }) => {
        return (
            <ListItem
                onPress={() => this.props.navigation.navigate('Solicitacao', opt)}
                containerStyle={styles.item}
                Component={TouchableScale}
                friction={90} //
                tension={100} // These props are passed to the parent component (here TouchableScale)
                activeScale={0.95}  >
                <Avatar title={opt.name} source={{ uri: opt.logo }} avatarStyle={styles.logo} />
                <ListItem.Content>
                    <ListItem.Title style={styles.titleItens}>{opt.name}</ListItem.Title>
                </ListItem.Content>
                <TouchableOpacity onPress={() => this.setStarred(opt.id)}>
                    <Icon name="star" color={this.state.starred[opt.id - 1] ? 'orange' : 'black'} size={15}></Icon>
                </TouchableOpacity>
            </ListItem >
        )
    }

    render() {
        const itens = this.props.route.params.itens
        return (

            <SafeAreaView style={styles.container}>
                <Text style={styles.title}>{this.props.route.params.name}</Text>
                <FlatList
                    keyExtractor={iten => iten.id.toString()}
                    data={itens}
                    renderItem={this.getOptionsItem}
                    style={styles.list} />
                <StatusBar style="auto" />
            </SafeAreaView>

        )
    }
}

const styles = StyleSheet.create({
    containerLogo: {
        flex: 1,
        alignItems: 'flex-start',
        backgroundColor: commonStyle.colors.primary,
    },
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
        borderBottomWidth: 1,
        borderColor: '#aaa',
        backgroundColor: commonStyle.colors.itens,
        marginBottom: 10
    },
    logo: {
        resizeMode: 'contain',

    },
    title: {
        fontFamily: commonStyle.fontFamily,
        fontSize: 40,
        color: commonStyle.colors.secundary,
        marginBottom: 10,
        textAlign: 'center'
    },
    titleItens: {
        fontFamily: commonStyle.fontFamily,
        color: '#000',
    },
    formContainer: {
        backgroundColor: commonStyle.colors.primary,
        padding: 20,
        width: '90%'
    },
    input: {
        marginTop: 10,
        backgroundColor: 'white',
    },
    button: {
        backgroundColor: commonStyle.colors.secundary,
        marginTop: 10,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8
    },
    buttonText: {
        fontFamily: commonStyle.fontFamily,
        color: '#000',
        fontSize: 20
    },
    image: {
        width: '100%',
        height: 50,
        resizeMode: 'contain'
    }
})

export default MenuItens