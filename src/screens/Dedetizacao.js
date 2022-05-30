import React, { Component } from "react";
import { StyleSheet, FlatList, Text, TouchableOpacity, View, Image } from 'react-native'
import commonStyle from "../commonStyle";
import { ListItem } from "react-native-elements";
import TouchableScale from 'react-native-touchable-scale';
import areas from "../data/areas";
import { SafeAreaView } from "react-native-safe-area-context";

class Dedetizacao extends Component {

    getOptionsItem = ({ item: area }) => {
        return (
            <ListItem
                onPress={() => this.props.navigation.navigate('InfoAnimal', area)}
                containerStyle={styles.item}
                Component={TouchableScale}
                friction={90} //
                tension={100} // These props are passed to the parent component (here TouchableScale)
                activeScale={0.95}  >
                <Image source={{ uri: area.image }} style={styles.logo} ></Image>
                <ListItem.Content style={styles.content}>
                    <ListItem.Title style={styles.titleItens}>{area.adotada ? "Adotada" : "Disponível"}</ListItem.Title>
                    <ListItem.Subtitle style={styles.subtitleItens}>{area.rua + ", " + area.numero + ", " + area.bairro}</ListItem.Subtitle>
                    <ListItem.Subtitle style={styles.subtitleItens}>{area.cidade + " - " + area.uf}</ListItem.Subtitle>
                    <ListItem.Subtitle style={styles.subtitleItens}>{area.description}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem >
        )
    }

    render() {
        return (
            <SafeAreaView style={styles.containerLogo} >
                <Text style={styles.subTitle}>{this.props.route.params.name}</Text>
                <FlatList
                    keyExtractor={area => area.id.toString()}
                    data={areas}
                    renderItem={this.getOptionsItem}
                    style={styles.list} />
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
    containerLogo: {
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

export default Dedetizacao