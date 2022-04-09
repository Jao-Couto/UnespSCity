import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, View, FlatList } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import commonStyle from "../commonStyle";
import { Avatar, ListItem } from "react-native-elements";
import options from "../data/options";
import Header from "../components/Header";

class Menu extends Component {

    getOptionsItem = ({ item: opt }) => {
        return (
            <ListItem onPress={() => this.props.navigation.navigate('MenuItens', opt)} containerStyle={styles.item} >
                <Avatar title={opt.name} source={{ uri: opt.logo }} avatarStyle={styles.logo} />
                <ListItem.Content>
                    <ListItem.Title style={styles.title}>{opt.name}</ListItem.Title>
                    <ListItem.Subtitle style={styles.subTitle}>{opt.subTitle}</ListItem.Subtitle>
                </ListItem.Content>
                <ListItem.Chevron />
            </ListItem>
        )
    }

    render() {
        return (
            <SafeAreaView style={styles.containerLogo} >
                <Header></Header>

                <View style={styles.container}>
                    <FlatList
                        keyExtractor={option => option.id.toString()}
                        data={options}
                        renderItem={this.getOptionsItem}
                        style={styles.list} />
                    <StatusBar style="auto" />
                </View>
            </SafeAreaView>

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
        justifyContent: 'center',
        backgroundColor: commonStyle.colors.primary
    },
    list: {
        width: '100%'
    },
    item: {
        borderBottomWidth: 1,
        borderColor: '#aaa',
        backgroundColor: commonStyle.colors.itens
    },
    logo: {
        resizeMode: 'contain'
    },
    title: {
        fontFamily: commonStyle.fontFamily,
        color: '#fff',
    },
    subTitle: {
        fontFamily: commonStyle.fontFamily,
        color: '#aaa',
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

export default Menu