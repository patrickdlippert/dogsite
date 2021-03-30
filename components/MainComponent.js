import React, { Component } from 'react';
import { View, Image, Text, StyleSheet, LogBox} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
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
          style={{ width: 180, height: 45 }}
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
      <HomeStack.Screen name="Home" component={Home} 
        options={{ headerShown: false }}
      /> 
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
      <ProfileStack.Screen name="Profile" component={ProfileEditor}
        options={{ headerShown: false }}
      />
    </ProfileStack.Navigator>
  );
}




const Tab = createMaterialTopTabNavigator();

function TabNavScreen() {
  return (
    <Tab.Navigator
      tabBarOptions={{
          activeTintColor: 'tomato',
          inactiveTintColor: 'gray',
          labelStyle: {
            fontSize: 16,
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
            headerTitle: '',
            headerLeft: props => <LogoTitle {...props} />,
            headerRight: () => (
              <View style={{ marginRight: 10}}>
                <Icon
                  name='heart'
                  type='font-awesome'
                  color='tomato'
                  size={28}
                  onPress={() => navigation.navigate('MyModal')}
                />
              </View>
            )
            })}
          >


            <RootStack.Screen name="Tab" component={TabNavScreen}  />
            <RootStack.Screen name="MyModal" component={Favorites}
              options={({route, navigation}) => ({
                 headerStyle: { backgroundColor: '#d5fafa'},
                 headerTitle: "My Favorites", 
                 headerTitleAlign: 'center',
                 headerLeft: () => ( <Text style={styles.textLink} onPress={ () => { navigation.navigate('Tab')}}>Done</Text>),
                 headerRight:''
                })
              }    
            />

            <RootStack.Screen
              name="DogDetail" 
              component={DogDetail}
              options={({ route, navigation }) => ({ 
                headerTitle: route.params.dog.name, 
                headerTitleAlign: 'center',
                headerLeft: () => ( <Text style={styles.textLink} onPress={ () => { navigation.goBack()}}>Back</Text>),
                headerRight:''
              
              })
            }  
            />  

          </RootStack.Navigator>
        </NavigationContainer>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  title: {
      marginTop: 10,
      fontSize: 22,
      fontWeight: 'bold'
  },
  textLink: {
    color: '#5637DD',
    fontWeight: '700',
    fontSize: 18,
    padding: 2,
    margin: 10    
  }
});

export default Main;