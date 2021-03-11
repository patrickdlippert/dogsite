import React, { Component } from 'react';
import Home from './HomeComponent';
import Attractions from './AttractionsComponent';
import Restaurants from './RestaurantsComponent';
import Favorites from './FavoritesComponent';
import HighlightInfo from './HighlightInfoComponent';
import FullList from './FullListComponent';
import { View, Text, Button, Platform, Image } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { TabBarIndicator } from 'react-native-tab-view';

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

  function DetailsScreen() {
    return (
      <View style={{ flex: 1, justifyContent: 'center',  alignItems: 'center' }}>
        <Text>Details!</Text>
      </View>
    );
  }
  function HomeScreen({ navigation }) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>  
        <Text>Home screen</Text>
        <Button
          title="Go to Details"
          onPress={() => navigation.navigate('Details')}
        />
      </View>
    );
  }
  function SettingsScreen({ navigation }) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings screen</Text>
        <Button
          title="Go to Details"
          onPress={() => navigation.navigate('Details')}
        />
      </View>
    );
  }

  const HomeStack = createStackNavigator();
  
  function HomeStackScreen() {
   return (
     <HomeStack.Navigator>
        <HomeStack.Screen name="Home" component={HomeScreen} /> 
        <HomeStack.Screen name="Details" component={DetailsScreen} />
     </HomeStack.Navigator>
    );
  }

  const SettingsStack = createStackNavigator();

  function SettingsStackScreen() {
    return (
      <SettingsStack.Navigator>
        <SettingsStack.Screen name="Settings" component={SettingsScreen} />
        <SettingsStack.Screen name="Details" component={DetailsScreen} />
      </SettingsStack.Navigator>
    );
  }



/*const HomeNavigator = createStackNavigator(
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

const FavoritesNavigator = createStackNavigator(
    {
        Favorites: { screen: Favorites },
    },
    {
        defaultNavigationOptions: ({navigation}) => ({
            headerStyle: {
                backgroundColor: '#5637DD'
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
                color: '#fff'
            }
        
        })
    }
);
*/

const Tab = createMaterialTopTabNavigator();




//const AppNavigator = createAppContainer(MainNavigator);

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
                <NavigationContainer>
                    <Tab.Navigator>
                        <Tab.Screen name="Home" component={HomeStackScreen} />
                        <Tab.Screen name="Settings" component={SettingsStackScreen} />
                   </Tab.Navigator>
                </NavigationContainer>


            </View>
        );
    }
}

export default Main;