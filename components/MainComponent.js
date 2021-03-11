import React, { Component } from 'react';
import Home from './HomeComponent';
import Attractions from './AttractionsComponent';
import Restaurants from './RestaurantsComponent';
import Events from './EventsComponent';
import HighlightInfo from './HighlightInfoComponent';
import FullList from './FullListComponent';
import { View, Platform, Image } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

function LogoTitle() {
    return (
        <View style={{alignItems: 'center', backgroundColor: '#D5FAFA'}}>
        <Image
            style={{ width: 250, height: 50 }}
            source={require('../assets/images/dawgr-logo.png')}
            resizeMode='contain'
        />
      </View>
    );
  }

const MainNavigator = createStackNavigator(
    {
        Home: { screen: Home },
        HighlightInfo: { screen: HighlightInfo },
        FullList: { screen: FullList}
    },
    {
        navigationOptions: {
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff',
            headerTitle: props => <LogoTitle {...props} />
            },

        }
    }
);


const Tab = createMaterialTopTabNavigator();

const AppNavigator = createAppContainer(MainNavigator);

class Main extends Component {
    render() {
        return (
            <View 
                style={{
                    flex: 1,
                    paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight
                }}
            >
                <LogoTitle />
                <AppNavigator />
            </View>
        );
    }
}

export default Main;