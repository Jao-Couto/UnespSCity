import React, { Component } from "react";
import { Text, StyleSheet, View, TouchableOpacity, Dimensions, ScrollView, Image } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import commonStyle from "../commonStyle";
import { ListItem } from "react-native-elements";
import Map from "./Map";
import { connect } from 'react-redux'


class InfoAnimal extends Component {

    render() {
        const item = this.props.route.params
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.subTitle}>Informações Adicionais</Text>
                <ScrollView style={{ width: '95%' }}>
                    <Map size={{ height: 250 }} coords={{ latitude: item.latitude, longitude: item.longitude }} markerName="Localização do animal"></Map>
                    <ListItem
                        containerStyle={styles.item} >
                        <Image source={{ uri: item.image }} style={styles.logo} ></Image>
                        <ListItem.Content style={styles.content}>
                            <ListItem.Title style={styles.titleItens}>{item.isAdopted ? "Adotada" : "Disponível"}</ListItem.Title>
                            <ListItem.Subtitle style={styles.subtitleItens}>{item.street + ", " + item.streetNumber}</ListItem.Subtitle>
                            <ListItem.Subtitle style={styles.subtitleItens}>{item.cityId + " - " + item.uf}</ListItem.Subtitle>
                            <ListItem.Subtitle style={styles.subtitleItens}>{item.description}</ListItem.Subtitle>
                        </ListItem.Content>
                    </ListItem >
                    {this.props.email == item.email ?
                        <TouchableOpacity style={[styles.button]} onPress={() => console.log("adotado")}>
                            <Text style={styles.buttonText}>
                                Adotado
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
    }
}


// export default Profile
export default connect(mapStateToProps)(InfoAnimal)
