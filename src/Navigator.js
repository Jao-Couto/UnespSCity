import React from "react";
import { StatusBar } from "expo-status-bar";
import Login from "./screens/Login";
import Register from "./screens/Register";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";
import Menu from "./screens/Menu";
import { connect } from "react-redux";
import MenuItens from "./screens/MenuItem";
import Solicitacao from "./screens/Solicitação";
import SolicitacaoTelefones from "./screens/SolicitaçãoTelefones";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem } from "@react-navigation/drawer";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Profile from "./screens/Profile";
import InfoCI from './screens/InfoCI'
import ListSolicitacoes from "./screens/ListSolicitacoes";
import {
    View,
    Text,
    StyleSheet
} from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { Gravatar } from "react-native-gravatar";
import commonStyle from "./commonStyle";
import Starred from "./screens/Starred";
import MapMenu from "./screens/MapMenu";
import PublicAreas from "./screens/PublicAreas";
import Icon from "react-native-vector-icons/FontAwesome";
import { logout } from "./storage/actions/user";
import LostAnimals from "./screens/LostAnimals";
import MapColetaLixo from "./screens/MapColetaLixo";
import SolicitAnimals from "./components/SolicitAnimals";
import Informations from "./components/informations";
import Radar from "./screens/Radar";
import Dedetizacao from "./screens/Dedetizacao";
import checkService from "./components/checkService";
import InfoAnimal from "./components/InfoAnimal";
import { resetMarkers } from "./storage/actions/marker";
import AddInteracao from "./screens/AddInteracao";


function App(props) {

    const Stack = createStackNavigator();
    const Tab = createBottomTabNavigator();

    const logout = () => {
        props.onLogout()
        props.onResetMarkers()
    }

    function MyTabs() {
        return (
            <Tab.Navigator initialRouteName="Mapa" screenOptions={{ headerShown: false }}>
                <Tab.Screen
                    name="Mapa"
                    component={MapMenu}
                    options={{
                        tabBarIcon: ({ focused }) => {
                            return (
                                <Icon name="map-marker" size={20} color={focused ? '#000' : '#aaa'}></Icon>
                            );
                        },
                    }}
                />
                <Tab.Screen
                    name="Favoritos"
                    component={Starred}
                    options={{
                        tabBarIcon: ({ focused }) => {
                            return (
                                <Icon name="home" size={20} color={focused ? '#000' : '#aaa'}></Icon>
                            );
                        },
                    }}
                />
                <Tab.Screen
                    name="Serviços"
                    component={Servicos}
                    options={{
                        tabBarIcon: ({ focused }) => {
                            return (
                                <Icon name="th" size={20} color={focused ? '#000' : '#aaa'}></Icon>
                            );
                        },
                    }}
                />
            </Tab.Navigator>
        )
    }

    function Servicos() {
        return (
            <Stack.Navigator initialRouteName="Menu" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Menu" component={Menu} />
                <Stack.Screen name="MenuItens" component={MenuItens} />
                <Stack.Screen name="Solicitacao" component={Solicitacao} />
                <Stack.Screen name="SolicitacaoTelefones" component={SolicitacaoTelefones} />
                <Stack.Screen name="LostAnimals" component={LostAnimals} />
                <Stack.Screen name="SolicitAnimals" component={SolicitAnimals} />
                <Stack.Screen name="PublicAreas" component={PublicAreas} />
                <Stack.Screen name="Informations" component={Informations} />
                <Stack.Screen name="InfoAnimal" component={InfoAnimal} />
                <Stack.Screen name="MapColetaLixo" component={MapColetaLixo} />
                <Stack.Screen name="RadarDengue" component={Radar} />
                <Stack.Screen name="RadarLeishmaniose" component={Radar} />
                <Stack.Screen name="RadarEscorpiao" component={Radar} />
                <Stack.Screen name="Dedetizacao" component={Dedetizacao} />
                <Stack.Screen name="CheckService" component={checkService} />
            </Stack.Navigator>
        )
    }



    function MyStack() {
        return props.email == null ?
            <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
            </Stack.Navigator>
            :
            <Home></Home>
    }

    const Drawer = createDrawerNavigator();

    const custonDrawer = (opt) => {
        return (
            <SafeAreaView style={{ flex: 1 }}>
                <View style={styles.userContent}>
                    <Gravatar options={{
                        email: props.email,
                        secure: true
                    }} style={styles.avatar} />
                    <Text style={styles.name}>{props.name}</Text>
                    <Text style={styles.email}>{props.email}</Text>
                </View>
                <DrawerContentScrollView {...opt}>
                    <DrawerItemList {...opt} />
                    <DrawerItem label="Sair" onPress={logout} inactiveTintColor="red"></DrawerItem>
                </DrawerContentScrollView>
            </SafeAreaView>
        );
    }

    function Home() {
        return (
            <Drawer.Navigator initialRouteName="Menu" screenOptions={{ headerShown: false }} drawerContent={custonDrawer}>
                <Drawer.Screen name="Menu" component={MyTabs} />
                <Drawer.Screen name="Perfil" component={Profile} />
                <Drawer.Screen name="Cidades Inteligentes" component={InfoCI} />
                <Drawer.Screen name="Solicitações" component={ServicosADM} />
            </Drawer.Navigator>
        );
    }

    function ServicosADM() {
        return (
            <Stack.Navigator initialRouteName="ListSolicitacoes" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="ListSolicitacoes" component={ListSolicitacoes} />
                <Stack.Screen name="LostAnimals" component={LostAnimals} />
                <Stack.Screen name="SolicitAnimals" component={SolicitAnimals} />
                <Stack.Screen name="PublicAreas" component={PublicAreas} />
                <Stack.Screen name="CheckService" component={checkService} />
                <Stack.Screen name="AddInteracao" component={AddInteracao} />
                <Stack.Screen name="Solicitacao" component={Solicitacao} />
            </Stack.Navigator>
        )
    }

    return (
        <NavigationContainer>
            <StatusBar style="dark" />
            <MyStack />
        </NavigationContainer>
    );
}

const styles = StyleSheet.create({
    userContent: {
        marginTop: 5,
        paddingLeft: 15,
        paddingBottom: 10,
        marginBottom: 0,
        borderBottomWidth: 1,
        borderColor: '#aaa'
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20
    },
    name: {
        fontSize: 17,
        fontFamily: commonStyle.fontFamily,
        marginTop: 10
    },
    email: {
        fontSize: 13,
        fontFamily: commonStyle.fontFamily,
        marginTop: 10
    }
})

const mapStateToProps = ({ user }) => {
    return {
        email: user.email,
        name: user.name,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onLogout: () => dispatch(logout()),
        onResetMarkers: () => dispatch(resetMarkers())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(App)
