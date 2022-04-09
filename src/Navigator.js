import React from "react";

import Login from "./screens/Login";
import Register from "./screens/Register";
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from "@react-navigation/native";
import Menu from "./screens/Menu";
import { connect } from "react-redux";
import MenuItens from "./screens/MenuItem";
import Solicitacao from "./screens/Solicitação";

function App(props) {
    const Stack = createStackNavigator();

    function MyStack() {
        return props.email == null ?
            <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Register" component={Register} />
            </Stack.Navigator>

            :
            <Stack.Navigator initialRouteName="Menu" screenOptions={{ headerShown: false }}>
                <Stack.Screen name="Menu" component={Menu} />
                <Stack.Screen name="MenuItens" component={MenuItens} />
                <Stack.Screen name="Solicitacao" component={Solicitacao} />
            </Stack.Navigator>



    }
    return (
        <NavigationContainer>
            <MyStack />
        </NavigationContainer>
    );
}

const mapStateToProps = ({ user }) => {
    return {
        email: user.email,
        name: user.name,
    }
}

export default connect(mapStateToProps)(App)
