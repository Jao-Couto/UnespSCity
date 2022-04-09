import React, { Component } from "react";
import { StyleSheet, View, Image, Text, TouchableOpacity } from 'react-native'
import commonStyle from "../commonStyle";
import { Gravatar } from 'react-native-gravatar'
import { Icon } from "react-native-elements";
import { connect } from 'react-redux'
import { logout } from '../storage/actions/user'

class Header extends Component {
    logout = () => {
        this.props.onLogout()
    }

    render() {
        const options = { email: this.props.email, secure: true }
        return (
            <View style={styles.container} >
                <Gravatar options={options} style={styles.avatar} />
                <Text style={styles.title}>UnespSCity</Text>
                <TouchableOpacity onPress={this.logout}>
                    <Icon name='logout' color='#f00' />
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

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(logout())
    }
}


// export default Profile
export default connect(mapStateToProps, mapDispatchToProps)(Header)