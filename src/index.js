import 'react-native-gesture-handler';
import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import initStorage from './commons/storage';
import Home from './pages/home';
import Detail from './pages/filmDetail';
import Coupon from './pages/coupon';
import AboutUs from './pages/aboutUs';
import Login from './pages/login/loginView';
import Register from './pages/login/register';
import Ticket from './pages/in/ticket';
import Favourite from './pages/in/favourite';
import List from './pages/in/list';

// 初始化global.storage
initStorage();

/* 注释调试提醒 */
console.ignoredYellowBox = ['Remote debugger'];

const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen
          name="Register"
          component={Register}
          options={{
            headerBackTitleStyle: {color: '#fff'},
            headerStyle: {
              backgroundColor: '#23223d',
            },
            headerBackTitleVisible: false,
            headerTitle: '',
          }}></Stack.Screen>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen
          name="Detail"
          component={Detail}
          options={{
            title: '电影',
            headerBackTitleVisible: false,
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: '#2A362C',
              opacity: 1,
            },
          }}></Stack.Screen>
        <Stack.Screen
          name="Coupon"
          component={Coupon}
          options={{
            headerTitle: '优惠券',
            headerTintColor: '#111',
            headerBackTitleVisible: false,
            headerStyle: {
              backgroundColor: '#f5f5f5',
              opacity: 1,
            },
          }}></Stack.Screen>
        <Stack.Screen
          name="AboutUs"
          component={AboutUs}
          options={{
            headerTitle: '关于我们',
            headerTintColor: '#111',
            headerBackTitleVisible: false,
            headerStyle: {
              backgroundColor: '#f5f5f5',
              opacity: 1,
            },
          }}></Stack.Screen>
        <Stack.Screen
          name="Ticket"
          component={Ticket}
          options={{
            headerTitle: '在线购票',
            headerBackTitleVisible: false,
            // headerRight: <Button title="分享" onPress={() => alert("点击了分享")} />,
            headerTintColor: '#fff',
            headerStyle: {
              backgroundColor: '#FF4E65',
              opacity: 1,
            },
          }}></Stack.Screen>
        <Stack.Screen
          name="Favourite"
          component={Favourite}
          options={{
            headerTitle: '我的收藏',
            headerBackTitleVisible: false,
            headerTintColor: '#000',
            headerStyle: {
              backgroundColor: '#fff',
              opacity: 1,
            },
          }}></Stack.Screen>
        <Stack.Screen
          name="List"
          component={List}
          options={{
            headerTitle: '我的订单',
            headerBackTitleVisible: false,
            headerTintColor: '#111',
            headerStyle: {
              backgroundColor: '#f5f5f5',
              opacity: 1,
            },
          }}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
