import {Dimensions, View, SafeAreaView} from 'react-native';
import React, {Component} from 'react';
import ScrollableTabView, {
  DefaultTabBar,
} from 'react-native-scrollable-tab-view';
import {NavigationContext} from '@react-navigation/native';

import HotList from './show/hotList';
import SoonList from './show/soonList';

const {width, height} = Dimensions.get('window');

export default class ShowList extends Component {
  constructor(props) {
    super(props);
    storage
      .load({key: 'hasLogin'})
      .then(res => {
        if (res !== true) {
          this.context.navigate('Login');
        }
      })
      .catch(err => {
        this.context.navigate('Login');
      });
  }

  static contextType = NavigationContext;

  static navigationOptions = {
    header: null,
  };
  render() {
    const {navigate} = this.props.navigation;

    return (
      <SafeAreaView>
        <View
          style={{
            width: width,
            height: height,
            paddingTop: 5,
            backgroundColor: '#fff',
          }}>
          <ScrollableTabView
            renderTabBar={() => <DefaultTabBar />}
            tabBarUnderlineStyle={{
              backgroundColor: '#4cc265',
              height: 2,
            }}
            tabBarBackgroundColor="#FFFFFF"
            tabBarActiveTextColor="#4cc265"
            tabBarInactiveTextColor="#959595"
            tabBarTextStyle={{fontSize: 14}}
            locked={false}>
            <View tabLabel="正在热映">
              <HotList navigation={this.props.navigation} />
            </View>
            <View tabLabel="即将上映">
              <SoonList navigation={this.props.navigation} />
            </View>
          </ScrollableTabView>
        </View>
      </SafeAreaView>
    );
  }
}
