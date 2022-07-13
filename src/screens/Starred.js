import { StatusBar } from "expo-status-bar";
import React, { Component } from "react";
import { StyleSheet, View, Text, FlatList, TouchableOpacity } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context";
import commonStyle from "../commonStyle";
import Header from "../components/Header";
import { Avatar, ListItem } from "react-native-elements";
import TouchableScale from 'react-native-touchable-scale';
import Icon from "react-native-vector-icons/FontAwesome";
import { connect } from "react-redux";
import { addStar } from "../storage/actions/starred";
import options from "../data/options";

class Starred extends Component {
    filterStarred = (id) => {
        const res = this.props.starred.filter(item => {
            return item == id
        }, false)
        return res.length > 0 ? true : false
    }

    getOptionsItem = ({ item: opt }) => {
        if (this.filterStarred(opt.id))
            return (
                <ListItem
                    onPress={() => this.props.navigation.navigate(opt.type, opt)}
                    containerStyle={styles.item}
                    Component={TouchableScale}
                    friction={90} //
                    tension={100} // These props are passed to the parent component (here TouchableScale)
                    activeScale={0.95}  >
                    <Avatar title={opt.name} source={opt.logo} avatarStyle={styles.logo} />
                    <ListItem.Content>
                        <ListItem.Title style={styles.titleItens}>{opt.name}</ListItem.Title>
                    </ListItem.Content>
                    <TouchableOpacity onPress={() => this.props.addStarred(opt.id)}>

                        <Icon name="star" color={'orange'} size={15}></Icon>

                    </TouchableOpacity>
                </ListItem >
            )
    }
    render() {
        const itens = options.reduce((prev, curr) => {
            return [...prev.itens, ...curr.itens]
        }, [])
        console.log(itens);
        return (
            <SafeAreaView style={styles.containerLogo} >
                <StatusBar style="auto" />
                <Header {...this.props}></Header>
                <View style={styles.container}>
                    <Text style={styles.title}>Favoritos</Text>
                    <FlatList
                        keyExtractor={iten => iten.id.toString()}
                        data={itens}
                        renderItem={this.getOptionsItem}
                        style={styles.list} />
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


const mapStateToProps = ({ starred }) => {
    return {
        starred: starred.starred
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addStarred: item => dispatch(addStar(item))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Starred) 