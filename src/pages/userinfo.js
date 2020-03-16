/* @flow */

import React, {Component} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  SafeAreaView,
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {NavigationContext} from '@react-navigation/native';

const {width, height} = Dimensions.get('window');
Icon.loadFont();

export default class My extends Component {
  static navigationOptions = {
    header: null,
  };
  static contextType = NavigationContext;
  constructor(props) {
    super(props);
    this.state = {
      color: '#f5f5f5',
    };
  }
  getRandomColor() {
    var str16 = ((Math.random() * 0x1000000) << 0).toString(16);
    function done(h) {
      return new Array(7 - h.length).join('0') + h;
    }
    var perfectStr = done(str16);
    return '#' + perfectStr;
  }

  componentDidMount() {
    // 清空数据
    // storage.save({ key: "movies", data: JSON.stringify([]) });
  }
  render() {
    const {navigate} = this.context;
    const {color} = this.state;
    return (
      <SafeAreaView>
        <View
          style={{
            height: height,
            alignItems: 'center',
            justifyContent: 'flex-start',
            flexDirection: 'column',
            backgroundColor: '#f5f5f5',
          }}>
          <View style={styles.header}>
            <Image
              source={require('../img/avator.png')}
              style={{
                width: 60,
                height: 60,
                marginRight: 24,
              }}
            />
            <View style={{flexDirection: 'column', flex: 1}}>
              <Text style={{fontSize: 22, paddingTop: 6, color: '#111'}}>
                小小影视
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  height: 40,
                }}>
                <Text style={{color: '#777', flex: 1, fontSize: 14}}>
                  每个夜晚，与你相伴
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.item}>
            <View style={styles.leaf}>
              <Icon name="movie" size={20} style={styles.icon}></Icon>
              <Text
                style={styles.text}
                onPress={() => this.context.push('Home')}>
                看电影
              </Text>
              <Text>></Text>
            </View>
          </View>

          <View style={styles.item}>
            <View style={[styles.leaf, styles.borderbottom]}>
              <Icon
                style={[styles.icon, {color: '#1b74e9'}]}
                size={20}
                name="star"></Icon>
              <Text style={styles.text} onPress={() => navigate('Favourite')}>
                收藏
              </Text>
              <Text>></Text>
            </View>
            <View style={[styles.leaf, styles.borderbottom]}>
              <Icon
                style={(styles.icon, {color: '#ee8b0c'})}
                size={20}
                name="receipt"></Icon>
              <Text
                style={styles.text}
                onPress={() => navigate('Coupon', {title: '优惠券'})}>
                优惠券
              </Text>
              <Text>></Text>
            </View>
            <View style={styles.leaf}>
              <Icon style={[styles.icon]} size={20} name="reorder"></Icon>
              <Text style={styles.text} onPress={() => navigate('List')}>
                我的订单
              </Text>
              <Text>></Text>
            </View>
          </View>
          {/* <View style={styles.item}>
          <View style={styles.leaf}>
            <Icon
              name="settings"
              size={20}
              style={[styles.icon, { color: "#1b74e9" }]}
            ></Icon>
            <Text
              style={styles.text}
              onPress={() => navigate("Coupon", { title: "我的设置" })}
            >
              设置
            </Text>
          </View>
        </View> */}

          <View style={styles.item}>
            <View style={styles.leaf}>
              <Icon
                name="person"
                size={20}
                style={[styles.icon, {color: '#1b74e9'}]}></Icon>
              <Text style={styles.text} onPress={() => navigate('AboutUs')}>
                关于我们
              </Text>
              <Text>></Text>
            </View>
          </View>
          <View style={styles.item}>
            <View style={styles.leaf}>
              <Icon
                name="adjust"
                size={20}
                style={[styles.icon, {color: '#f00'}]}></Icon>
              <Text style={styles.text} onPress={() => navigate('Login')}>
                退出登陆
              </Text>
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    padding: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#d5d5d5',
    marginBottom: 7,
    width: '100%',
    backgroundColor: '#fff',
  },
  item: {
    borderTopWidth: 1,
    borderTopColor: '#d5d5d5',
    borderBottomWidth: 1,
    borderBottomColor: '#d5d5d5',
    width: '100%',
    marginVertical: 7,
    paddingHorizontal: 14,
    backgroundColor: '#fff',
  },
  leaf: {
    paddingHorizontal: 12,
    flexDirection: 'row',
    alignItems: 'center',
    height: 50,
  },
  icon: {
    color: '#4cc265',
  },
  text: {
    color: '#222',
    paddingLeft: 18,
    paddingVertical: 12,
    flex: 1,
  },
  borderbottom: {
    borderBottomWidth: 1,
    borderBottomColor: '#d5d5d5',
  },
});
