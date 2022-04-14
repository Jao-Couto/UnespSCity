import React, { Component } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native'
import commonStyle from "../commonStyle";
import { Gravatar } from 'react-native-gravatar'
import Icon from 'react-native-vector-icons/FontAwesome'
import { connect } from 'react-redux'


class Header extends Component {

    render() {
        const options = { email: this.props.email, secure: true }
        return (
            <View style={styles.container} >
                <TouchableOpacity onPress={() => this.props.navigation.toggleDrawer()}>
                    <Icon name='bars' color='#000' size={25} />
                </TouchableOpacity>
                <Text style={styles.title}>UnespSCity</Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Menu')} >
                    <Gravatar options={options} style={styles.avatar} />
                </TouchableOpacity>
            </View >
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: commonStyle.colors.primary,
        marginBottom: 10
    },
    text: {
        fontSize: 20,
        color: '#fff'
    },
    title: {
        fontSize: 40,
        color: commonStyle.colors.secundary
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20
    },
})


const mapStateToProps = ({ user }) => {
    return {
        email: user.email,
        name: user.name,
    }
}



// export default Profile
export default connect(mapStateToProps)(Header)