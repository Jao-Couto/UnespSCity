import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, View, FlatList, Dimensions } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import commonStyle from "../commonStyle";
import { Avatar, ListItem } from "react-native-elements";
import options from "../data/options";
import Header from "../components/Header";
import TouchableScale from 'react-native-touchable-scale';

class Menu extends Component {

    getOptionsItem = ({ item: opt }) => {
        const spaceRight = opt.id % 3 !== 0 ? { marginRight: 5 } : {}
        return (
            <ListItem
                onPress={() => this.props.navigation.navigate('MenuItens', opt)}
                containerStyle={[styles.item, spaceRight]}
                Component={TouchableScale}
                friction={90} //
                tension={100} // These props are passed to the parent component (here TouchableScale)
                activeScale={0.95} >
                <Avatar title={opt.name} source={{ uri: opt.logo }} avatarStyle={styles.logo} />
                <ListItem.Content style={styles.itemContent}>
                    <ListItem.Title style={styles.title}>{opt.name}</ListItem.Title>
                    <ListItem.Subtitle style={styles.subTitle}>{opt.subTitle}</ListItem.Subtitle>
                </ListItem.Content>
            </ListItem>
        )
    }


    render() {
        return (
            <SafeAreaView style={styles.containerLogo} >
                <Header {...this.props}></Header>

                <View style={styles.container}>
                    <FlatList
                        keyExtractor={option => option.id.toString()}
                        data={options}
                        numColumns={3}
                        renderItem={this.getOptionsItem}
                        contentContainerStyle={styles.list} />
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
        width: '100%',
        padding: 2
    },
    item: {
        flexDirection: 'column',
        width: Dimensions.get('window').width / 3 - 6,
        height: 150,
        marginBottom: 10,
        backgroundColor: commonStyle.colors.primary,
        shadowOffset: {
            width: 10,
            height: -10
        },
        elevation: 15,
        borderRadius: 10
    },
    itemContent: {
        width: '100%',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    logo: {
        resizeMode: 'contain'
    },
    title: {
        fontFamily: commonStyle.fontFamily,
        color: '#000',
        fontSize: 15,
        flexWrap: 'wrap',
        textAlign: 'center'
    },
    subTitle: {
        fontFamily: commonStyle.fontFamily,
        color: '#555'
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