/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View
} from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import DetailScreen from './src/screens/DetailScreen';
import HomeScreen from './src/screens/HomeScreen';
import LocationScreen from './src/screens/LocationScreen';
import SettingsScreen from './src/screens/SettingsScreen';

// type SectionProps = PropsWithChildren<{
//   title: string;
// }>;

const Tab = createBottomTabNavigator();
const HomeStack = createStackNavigator();

function DetailStackScreen() {
  return (
    <HomeStack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={'List'}>
      <HomeStack.Screen name="List" component={LocationScreen} />
      <HomeStack.Screen name="Details" component={DetailScreen} />
    </HomeStack.Navigator>
  );
}


function App(): JSX.Element {

  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: 'transparent',
            opacity: 0.7,

            height: 90,
            ...styles.bottomBar,
          },
        }}
        initialRouteName={'Home'}>
        <Tab.Screen
          name="Location Screen"
          component={DetailStackScreen}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  top: 15,
                }}>
                <Image
                  resizeMode={'contain'}
                  source={
                    focused
                      ? require('./src/img/bottomIcon/locationPressed.png')
                      : require('./src/img/bottomIcon/location.png')
                  }
                  style={
                    focused
                      ? {width: 25, height: 25, top: -5}
                      : {width: 25, height: 25}
                  }
                />
                <Text
                  style={{
                    fontWeight: focused ? '600' : '300',
                  }}>
                  Vị trí
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  top: 15,
                }}>
                <Image
                  resizeMode={'contain'}
                  source={
                    focused
                      ? require('./src/img/bottomIcon/pressedHome.png')
                      : require('./src/img/bottomIcon/NonPressedHome.png')
                  }
                  style={
                    focused
                      ? {width: 25, height: 25, top: -5}
                      : {width: 25, height: 25}
                  }
                />
                <Text
                  style={{
                    fontWeight: focused ? '600' : '300',
                  }}>
                  Thời tiết
                </Text>
              </View>
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          component={SettingsScreen}
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({focused}) => (
              <View
                style={{
                  alignItems: 'center',
                  justifyContent: 'center',
                  top: 15,
                }}>
                <Image
                  resizeMode={'contain'}
                  source={
                    focused
                      ? require('./src/img/bottomIcon/settingPressed.png')
                      : require('./src/img/bottomIcon/setting.png')
                  }
                  style={
                    focused
                      ? {width: 25, height: 25, top: -5}
                      : {width: 25, height: 25}
                  }
                />
                <Text
                  style={{
                    fontWeight: focused ? '600' : '300',
                  }}>
                  Cài đặt
                </Text>
              </View>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  bottomBar: {
    shadowColor: '#7F5DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
});
export default App;
