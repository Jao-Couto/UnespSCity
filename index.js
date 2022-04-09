
import 'react-native-gesture-handler';
import React from 'react';
import { registerRootComponent } from 'expo';
import { Provider } from 'react-redux';

import storeConfig from './src/storage/storeConfig'
import Navigator from './src/Navigator'


const store = storeConfig()
const Redux = () => {
    return (
        <Provider store={store}>
            <Navigator />
        </Provider>)
}

registerRootComponent(Redux);
