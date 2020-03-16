import {Text, View, Dimensions} from 'react-native';
import React, {Component} from 'react';

const {width, height} = Dimensions.get('window');

export default class Empty extends Component {
  constructor(props) {
    super(props);
  }
  static navigationOptions = ({navigation}) => ({
    headerTitle: navigation.state.params.title,
    headerTintColor: '#111',
    headerStyle: {
      backgroundColor: '#f5f5f5',
      opacity: 1,
    },
  });

  render() {
    return (
      <View style={{height: height, width: width}}>
        <Text
          style={{
            fontSize: 14,
            fontWeight: '500',
            color: '#aaa',
            textAlign: 'center',
            padding: 30,
          }}>
          您还没有可用的优惠券！
        </Text>
        <Text
          style={{
            fontSize: 14,
            fontWeight: '500',
            textAlign: 'center',
            padding: 14,
            margin: 12,
            color: '#f77212',
            borderStyle: 'dotted',
            borderColor: '#f77212',
            borderWidth: 1,
          }}>
          平台会不定时发布优惠券，记得来领取哦。
        </Text>
      </View>
    );
  }
}
