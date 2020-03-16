import React, {Component} from 'react';
import {Dimensions, View, FlatList, StyleSheet} from 'react-native';
import ScrollableTabView from 'react-native-scrollable-tab-view';

import Ranking from '../../components/ranking';
import {FAVOURITE} from '../../commons/API';

let fav = FAVOURITE.slice();
for (let i = 0, l = fav.length; i < l; i++) {
  let j = Math.floor(Math.random() * l);
  [fav[i], fav[j]] = [fav[j], fav[i]];
}

const start = 0;
const {width, height} = Dimensions.get('window');
export default class Favourite extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fav: [],
      ready: true,
    };
  }

  // static navigationOptions = ({navigation}) => ({
  //   headerTitle: '我的收藏',
  //   headerTintColor: '#000',
  //   headerStyle: {
  //     backgroundColor: '#fff',
  //     opacity: 1,
  //   },
  // });

  async componentDidMount() {
    this.setState({
      fav: fav,
    });
  }

  _changeData = async obj => {};

  _fetchMore = async () => {};

  render() {
    const {navigate} = this.props.navigation;
    const {fav} = this.state;
    return (
      //设置轮播组件Swiper的包裹容器高度，使用属性设置，不能通过样式设置
      <View
        style={{
          width: width,
          height: height,
          marginTop: -35,
          backgroundColor: '#fff',
        }}>
        <ScrollableTabView
          tabBarUnderlineStyle={{
            backgroundColor: '#fff',
            height: 0,
          }}
          tabBarBackgroundColor="#FFFFFF"
          tabBarActiveTextColor="#000"
          tabBarInactiveTextColor="#959595"
          tabBarTextStyle={{
            fontSize: 0,
          }}
          locked={false}
          onChangeTab={i => this._changeData(i)}>
          <View tabLabel="" style={{marginBottom: 0}}>
            <FlatList
              data={fav}
              onEndReached={this._fetchMore}
              onEndReachedThreshold={0.5}
              keyExtractor={(item, i) => i.toString()}
              renderItem={({item, index}) => {
                const {title, id, rating, directors, casts, images} = item;
                return (
                  <Ranking
                    navigation={this.props.navigation}
                    title={title}
                    average={rating.average}
                    star={rating.stars}
                    directors={directors[0].name}
                    casts={casts}
                    index={index}
                    image={images.large}
                    noimage={true}
                    id={id}
                    noto={true}
                  />
                );
              }}
            />
          </View>
        </ScrollableTabView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
  },
});
