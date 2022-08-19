
import React, { Component } from "react";
import { StyleSheet, Text, Image, ScrollView } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import commonStyle from "../commonStyle";
import Header from "../components/Header";
import CI_1 from '../../assets/CI_1.png'
import CI_2 from '../../assets/CI_2.png'
import CI_3 from '../../assets/CI_3.png'

class InfoCI extends Component {
    render() {
        return (
            <SafeAreaView style={styles.containerLogo} >
                <Header {...this.props}></Header>
                <Text style={styles.title}>Cidades Inteligentes</Text>
                <ScrollView style={styles.container}>
                    <Image source={CI_1} style={styles.image}></Image>
                    <Image source={CI_2} style={styles.image}></Image>
                    <Image source={CI_3} style={styles.image}></Image>
                </ScrollView>
            </SafeAreaView >

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
        backgroundColor: commonStyle.colors.primary
    },
    image: {
        width: '100%',
        height: 350,
        resizeMode: 'contain',
        margin: 0
    },
    title: {
        fontFamily: commonStyle.fontFamily,
        color: '#000',
        fontSize: 30,
        fontWeight: 'bold'
    },
})

export default InfoCI