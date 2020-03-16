import {Text, View, Dimensions} from 'react-native';
import React, {Component} from 'react';
const {width, height} = Dimensions.get('window');

export default class AboutUs extends Component {
  constructor(props) {
    super(props);
  }
  // static navigationOptions = ({ navigation }) => ({
  //   headerTitle: "关于我们",
  //   headerTintColor: "#111",
  //   headerStyle: {
  //     backgroundColor: "#f5f5f5",
  //     opacity: 1
  //   }
  // });

  render() {
    return (
      <View style={{height: height, width: width}}>
        <Text style={{lineHeight: 30, padding: 24}}>
          &emsp;&emsp;
          感谢下载我们的APP小小影视。小小影视是一款影视资讯类APP。这里有你各种影视资讯及评价，希望你们会喜欢。如果有什么不足的地方请多多包涵。有宝贵意见或者建议也可以第一时间反馈给我们，我们一定会不断改进，以便带来更好的体验。
        </Text>
      </View>
    );
  }
}
