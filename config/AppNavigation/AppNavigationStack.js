import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from "../../screens/Home"
import Register from '../../screens/Register';
import ProfileEdit from '../../screens/ProfileEdit';

const AppNavigationStack = props => {

    const Stack = createStackNavigator();

    return (

        <>
            <NavigationContainer>
                <Stack.Navigator screenOptions={{
                    headerShown: false
                }}>
                    <Stack.Screen name="ProfileEdit" component={ProfileEdit} />
                    <Stack.Screen name="Register" component={Register} />
                    <Stack.Screen name="Home" component={Home} />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
};

export default AppNavigationStack;