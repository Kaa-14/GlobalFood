import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Icon} from 'react-native-elements';
import HomeScreen from '../screens/HomeScreen';
import AddFoodScreen from '../screens/AddFoodScreen';
import ShowFoodScreen from '../screens/ShowFoodScreen';
import ImageZoomScreen from '../screens/ImageZoomScreen';
import EditFoodScreen from '../screens/EditFoodScreen';
import SplashScreen from '../screens/SplashScreen';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const DrawerNav = () => {
  return (
    <Drawer.Navigator
      initialRouteName="Home"
      screenOptions={{drawerActiveTintColor: '#66B2FF'}}>
      <Drawer.Screen
        name="Home"
        component={HomeScreen}
        options={{
          title: 'GLOBAL FOOD',
          headerStyle: {
            backgroundColor: '#99CCFF',
          },
          headerTitleAlign: 'center',
          drawerIcon: config => <Icon name="home" type="antdesign" />,
        }}
      />
      <Drawer.Screen
        name="AddFood"
        component={AddFoodScreen}
        options={{
          title: 'ADD FOOD',
          headerStyle: {
            backgroundColor: '#99CCFF',
          },
          headerTitleAlign: 'center',
          drawerIcon: config => <Icon name="plus" type="antdesign" />,
        }}
      />
    </Drawer.Navigator>
  );
};

const MainNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Drawer"
          component={DrawerNav}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ShowFood"
          component={ShowFoodScreen}
          options={{
            title: 'Food',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#99CCFF',
            },
          }}
        />
        <Stack.Screen
          name="ImageZoom"
          component={ImageZoomScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="EditFood"
          component={EditFoodScreen}
          options={{
            title: 'Edit Food',
            headerTitleAlign: 'center',
            headerStyle: {
              backgroundColor: '#99CCFF',
            },
          }}
        />
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainNavigator;
