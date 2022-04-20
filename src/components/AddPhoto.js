import React, { Component } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    Dimensions,
    ScrollView
} from 'react-native'
import commonStyle from '../commonStyle'
import * as ImagePicker from 'expo-image-picker';

import Icon from 'react-native-vector-icons/FontAwesome'

class AddPhoto extends Component {
    state = {
        image: { uri: null, base64: null }
    };

    pickLocalImage = async () => {
        let res = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
            base64: true
        });

        if (!res.cancelled) {
            this.setState({ image: { uri: res.uri, base64: res.base64 } });
        }
    }

    pickCameraImage = async () => {
        let res = await ImagePicker.launchCameraAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1,
            base64: true
        });

        if (!res.cancelled) {
            this.setState({ image: { uri: res.uri, base64: res.base64 } });
        }
    }


    render() {

        return (
            <ScrollView>
                <View style={styles.container}>
                    <Text style={styles.title}>Adicione uma Foto</Text>
                    <View style={styles.imageContainer}>
                        <Image source={{ uri: this.state.image.uri || 'https://cdn.pixabay.com/photo/2017/01/31/20/34/photo-camera-2027073_960_720.png' }} style={this.state.image.uri ? styles.image : styles.imagePadrao} />
                    </View>
                    <View style={styles.choicesContainer}>
                        <Text style={styles.buttomText}>Escolha uma foto</Text>
                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity
                                style={styles.buttom}
                                onPress={this.pickLocalImage}
                            >
                                <Icon name='folder' size={30} color="#000" />
                                <Text> arquivos</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={styles.buttom}
                                onPress={this.pickCameraImage}
                            >
                                <Icon name='camera' size={30} color="#000" />
                                <Text >camera</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View >
            </ScrollView >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        marginTop: 30,
        fontWeight: 'bold',
    },
    imageContainer: {
        width: '100%',
        height: Dimensions.get('window').height / 2,
        backgroundColor: '#eee',
        marginTop: 10,
        resizeMode: 'contain',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: Dimensions.get('window').height / 2,
        resizeMode: 'contain'
    },
    imagePadrao: {
        width: 50,
        height: 50,
        resizeMode: 'contain'
    },
    buttom: {
        alignItems: 'center'
    },
    choicesContainer: {
        flexDirection: 'column',
        alignContent: 'center',
        width: '70%',
        marginTop: 30,
        padding: 5,
        backgroundColor: commonStyle.colors.itens,
        borderRadius: 10
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: 'auto',
        padding: 10,
    },
    buttomText: {
        fontSize: 20,
        color: '#000',
        textAlign: 'center'
    },
})

export default AddPhoto
