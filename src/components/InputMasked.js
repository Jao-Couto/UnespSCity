import React from "react";
import { View, TextInput, StyleSheet, Text } from "react-native";
import Icon from 'react-native-vector-icons/FontAwesome'
import commonStyle from "../commonStyle";
import { TextInputMask } from 'react-native-masked-text'

export default props => {
    return (
        <View style={styles.containerError}>
            <View style={[styles.container, props.style]}>
                <View style={styles.icon}>
                    <Icon name={props.icon} size={20} color='#fff' />
                </View>
                <TextInputMask
                    style={[styles.input, props.style]}
                    {...props}
                />
            </View>
            <Text style={styles.error}>{props.error}</Text>

        </View>
    )
}

const styles = StyleSheet.create({
    containerError: {
        alignItems: 'center',
        marginBottom: 10
    },
    container: {
        width: '100%',
        height: 50,
        borderRadius: 2,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        backgroundColor: 'white',
    },
    icon: {
        color: '#333',
        width: "15%",
        height: '100%',
        backgroundColor: commonStyle.colors.secundary,
        justifyContent: 'center',
        alignItems: 'center',
        borderTopLeftRadius: 2,
        borderBottomLeftRadius: 2
    },
    input: {
        fontFamily: commonStyle.fontFamily,
        marginLeft: 5,
        width: '85%',
        fontSize: 20,
        color: 'black'
    },
    error: {
        fontFamily: commonStyle.fontFamily,
        color: '#f00',
        fontSize: 15,
        marginTop: 5,
        padding: 2,
        borderRadius: 5
    }
})