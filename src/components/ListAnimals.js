import React, { Component } from "react";
import { StyleSheet, FlatList, Text, TouchableOpacity, View, Image } from 'react-native'
import commonStyle from "../commonStyle";
import { Avatar, ListItem } from "react-native-elements";
import TouchableScale from 'react-native-touchable-scale';
import animals from "../data/animals";

class ListAnimals extends Component {

    getOptionsItem = ({ item: animal }) => {
        const breed = animal.breed == ''? '': animal.breed+" - "
        return (
            <ListItem
                onPress={() => console.log("info")}
                containerStyle={styles.item}
                Component={TouchableScale}
                friction={90} //
                tension={100} // These props are passed to the parent component (here TouchableScale)
                activeScale={0.95}  >
                    <Image source={{ uri: animal.image } } style={styles.logo} ></Image>
                <ListItem.Content style={styles.content}>
                    <ListItem.Title style={styles.titleItens}>{animal.name}</ListItem.Title>
                    <ListItem.Subtitle style={styles.subtitleItens}>{breed+animal.gender}</ListItem.Subtitle>
                    <ListItem.Subtitle style={styles.subtitleItens}>{animal.description}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem >
        )
    }

    render() {
        return (
            <View style={styles.container}>
                <FlatList
                    keyExtractor={animal => animal.id.toString()}
                    data={animals}
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
    content:{
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    }
})

export default ListAnimals