import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {SafeAreaView, View, Dimensions} from 'react-native';
import ShowList from './showList';
import My from './userinfo';
import Discovery from './discovery';
import Icon from 'react-native-vector-icons/MaterialIcons';

const Tab = createBottomTabNavigator();
// const {width, height} = Dimensions.get('window');
Icon.loadFont();

function Home() {
  return (
    // <SafeAreaView>
    <View style={{height: '100%', width: '100%'}}>
      <Tab.Navigator
        initialRouteName="ShowList"
        tabBarOptions={{
          activeTintColor: '#4cc265',
          inactiveTintColor: '#000',
          labelStyle: {
            fontSize: 12,
            marginBottom: 5,
          },
          style: {
            borderTopWidth: 1,
            borderTopColor: '#e6e6e6',
            // padding: 14,
            backgroundColor: '#f9f9f9',
          },
        }}>
        <Tab.Screen
          name="ShowList"
          component={ShowList}
          options={{
            tabBarLabel: '热映',
            tabBarIcon: ({color}) => <Icon name="tv" color={color} size={20} />,
          }}
        />
        <Tab.Screen
          name="Discovery"
          component={Discovery}
          options={{
            tabBarLabel: '发现',
            tabBarIcon: ({color}) => (
              <Icon name="visibility" color={color} size={20} />
            ),
          }}
        />
        <Tab.Screen
          name="My"
          component={My}
          options={{
            tabBarLabel: '我的',
            tabBarIcon: ({color}) => (
              <Icon name="person" color={color} size={20} />
            ),
          }}
        />
      </Tab.Navigator>
    </View>
    // </SafeAreaView>
  );
}

export default Home;
