import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from "../../screens/Home"
import Login from "../../screens/Login"
import Register from '../../screens/Register';
import Profile from '../../screens/Profile';
import ProfileEdit from '../../screens/ProfileEdit';
import { connect } from "react-redux"
import { firebase_login_check } from "../../store/action"

const Dashboard = () => {
    const Drawer = createDrawerNavigator();
    return (
        <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Profile" component={Profile} />
        </Drawer.Navigator>
    )
}

const LoginArea = () => {
    const Drawer = createDrawerNavigator();
    return (
        <Drawer.Navigator initialRouteName="Login">
            <Drawer.Screen name="Login" component={Login} />
            <Drawer.Screen name="Register" component={Register} />
        </Drawer.Navigator>
    )
}

const AppNavigation = props => {

    const Stack = createStackNavigator();

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{
                headerShown: false
            }}>
                <Stack.Screen name="LoginArea" component={LoginArea} />
                <Stack.Screen name="Dashboard" component={Dashboard} />
                <Stack.Screen name="ProfileEdit" component={ProfileEdit} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

const mapStateToProps = (state) => ({
    user: state.user
})


const mapDispatchToProps = (dispatch) => ({
    firebase_login_check: (data) => dispatch(firebase_login_check(data)),
})

export default connect(mapStateToProps, mapDispatchToProps)(AppNavigation);