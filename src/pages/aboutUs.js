import {Text, View, Dimensions} from 'react-native';
import React, {Component} from 'react';
const {width, height} = Dimensions.get('window');

export default class AboutUs extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={{height: height, width: width}}>
        <Text style={{lineHeight: 30, paddingHorizontal: 24, paddingTop: 24}}>
          &emsp;&emsp; 诺瓦克·德约科维奇（Novak
          Djokovic），1987年5月22日出生于塞尔维亚，塞尔维亚职业网球运动员。
        </Text>
        <Text
          style={{lineHeight: 30, paddingHorizontal: 24, paddingVertical: 6}}>
          &emsp;&emsp;
          2003年，德约科维奇转为职业球员，开始职业生涯。2007年，世界排名升至第三。2008年，首次获得澳网冠军。2011年，获得澳网、温网和美网冠军，世界排名升至第一。2016年，勇夺法网冠军，并实现跨年连夺四大满贯的壮举，完成职业生涯全满贯。2018年8月，首次问鼎辛辛那提大师赛，职业生涯包揽大师赛全部九站冠军，达成“金大师”伟业。2020年2月2日德约科维奇逆转战胜蒂姆，成就史无前例的澳网八冠王，也将自己职业生涯大满贯数量增加至17个。
        </Text>

        <Text
          style={{lineHeight: 30, paddingHorizontal: 24, paddingVertical: 6}}>
          &emsp;&emsp;
          截至2020年2月24日，德约科维奇已经赢得包括17个大满贯、33个大师系列赛和5个年终总决赛在内的74项ATP单打桂冠。2019年1月，ATP世界排名第1。
        </Text>
      </View>
    );
  }
}
