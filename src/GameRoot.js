import React from 'react';
import {StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {store} from 'app/store/store';
import {NavigationContainer} from '@react-navigation/native';
import {navigationRef} from 'app/navigationRef';
import {setCurrentRouteName} from 'app/store/coreReducer';
import RootNavigator from 'app/navigation/RootNavigator';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

export default function GameRoot() {
    return (<GestureHandlerRootView style={{flex:1}}>
        <StatusBar translucent barStyle="light-content" />
        <SafeAreaProvider>
            <Provider store={store}>
                <NavigationContainer
                    ref={navigationRef}
                    onStateChange={e => {
                        const currentRouteName = e?.routes[e.index]?.name;
                        store.dispatch(setCurrentRouteName(currentRouteName));
                    }}>
                    <RootNavigator />
                </NavigationContainer>
            </Provider>
        </SafeAreaProvider>
    </GestureHandlerRootView>);
}
