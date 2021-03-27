import React, { Component } from 'react';
import { View, Image, LogBox} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Ionicons } from '@expo/vector-icons';
import { Icon } from 'react-native-elements';
import Home from './HomeComponent';
import DogDetail from './DogDetailComponent';
import FullList from './FullListComponent';
import ProfileEditor from './ProfileEditorComponent';
import Favorites from './FavoritesComponent';

LogBox.ignoreLogs(['Your project is accessing the following APIs from a deprecated global rather than a module import: Constants (expo-constants).']);



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



const HomeStack = createStackNavigator();

function HomeStackScreen() {
 return (
   <HomeStack.Navigator
      initialRouteName="Home"
   >
      <HomeStack.Screen name="Home" component={Home} /> 
      <HomeStack.Screen
        name="DogDetail" 
        component={DogDetail}
        options={({ route }) => ({ title: route.params.dog.name })}
      />  
      <HomeStack.Screen
        name="FullList" 
        component={FullList}
        options={({ route }) => ({ title: route.params.title })}
      />            
   </HomeStack.Navigator>
  );
}



const ProfileStack = createStackNavigator();

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator>
      <ProfileStack.Screen name="Profile" component={ProfileEditor} />
    </ProfileStack.Navigator>
  );
}




const Tab = createMaterialTopTabNavigator();

function TabNavScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
        let iconName;
        if (route.name === 'Home') {
            iconName = focused
            ? 'ios-information-circle'
            : 'ios-information-circle-outline';
          } else if (route.name === 'Profile') {
            iconName = focused
            ? 'ios-list-box'
            : 'ios-list';
          }
      return <Ionicons name={iconName} size={size} color={color} />;
      },
        })}
  
      tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
          labelStyle: {
            fontSize: 14,
            fontWeight: "bold"
          },
          }}>
          <Tab.Screen name="Home" component={HomeStackScreen} />
          <Tab.Screen name="Profile" component={ProfileStackScreen} />
    </Tab.Navigator>
  );
}

const RootStack = createStackNavigator();

class Main extends Component {
  render() {
    return (
      <View 
        style={{
            flex: 1,
            paddingTop: Platform.OS === 'ios' ? 0 : Expo.Constants.statusBarHeight
        }}
       >


        <NavigationContainer>
          <RootStack.Navigator mode="modal" 
           screenOptions={({route, navigation}) => ({
            headerStyle: { backgroundColor: '#d5fafa'},
            headerTitle: props => <LogoTitle {...props} />,
              headerRight: () => (

                <Icon
                name='heart'
                type='font-awesome'
                color='tomato'
                size={12}
                raised
                reverse
                onPress={() => navigation.navigate('MyModal')}
                />

              )
            })}
          >


            <RootStack.Screen name="Tab" component={TabNavScreen}  />
            <RootStack.Screen name="MyModal" component={Favorites} 
              options={{ headerStyle: { backgroundColor: '#d5fafa'}, headerTitle: "My Favorites", headerRight:'' }}/>

            <RootStack.Screen
              name="DogDetail" 
              component={DogDetail}
              options={({ route }) => ({ title: route.params.dog.name })}
            />  
            <RootStack.Screen
              name="FullList" 
              component={FullList}
              options={({ route }) => ({ title: route.params.title })}
            /> 
          </RootStack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}

export default Main;