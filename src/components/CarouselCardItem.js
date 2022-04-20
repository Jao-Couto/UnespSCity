import React from 'react'
import { View, Text, StyleSheet, Dimensions, Image } from "react-native"

export const SLIDER_WIDTH = Dimensions.get('window').width
export const ITEM_WIDTH = Dimensions.get('window').width - 10

const CarouselCardItem = ({ item, index }) => {
    return (
        <View style={styles.container} key={index}>
            <Text style={styles.header}>{item.name}</Text>
            <View style={styles.body}>
                <Image
                    source={{ uri: item.logo }}
                    style={styles.image}
                />
                <Text style={styles.bodyText}>{item.subTitle}</Text>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        borderRadius: 8,
        width: ITEM_WIDTH,
        paddingBottom: 40,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },
    image: {
        width: '100%',
        height: 75,
        resizeMode: 'contain',
    },
    header: {
        color: "#222",
        fontSize: 28,
        fontWeight: "bold",
        paddingLeft: 20,
        paddingTop: 20
    },
    body: {
        marginLeft: 20,
        marginTop: 10,
    },
    bodyText: {
        flexWrap: 'wrap',
        color: "#222",
        fontSize: 18,
    }
})

export default CarouselCardItem