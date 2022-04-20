import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, View, Text } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import commonStyle from "../commonStyle";
import CarouselCards from "../components/CarouselCard";
import Header from "../components/Header";
class Starred extends Component {

    render() {
        return (
            <SafeAreaView style={styles.containerLogo} >
                <StatusBar style="auto" />
                <Header {...this.props}></Header>
                <View style={styles.container}>
                    <Text style={styles.title}>Notícias</Text>
                    <CarouselCards></CarouselCards>
                </View>
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
    title: {
        fontFamily: commonStyle.fontFamily,
        color: '#000',
        fontWeight: 'bold',
        fontSize: 30,
        width: '100%',
        textAlign: 'center',
        marginBottom: 10
    },
})


export default Starred