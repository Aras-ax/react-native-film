import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  FlatList,
  SafeAreaView,
  Alert,
} from 'react-native';
import React, {Component} from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {NavigationContext} from '@react-navigation/native';

// Icon.loadFont();
const {width, height} = Dimensions.get('window');
export default class Login extends Component {
  static contextType = NavigationContext;

  constructor(props) {
    super(props);
    this.state = {
      user: '',
      password: '',
      movies: [],
    };

    this.getMovie();
  }
  // static navigationOptions = ({navigation}) => ({
  //   headerTitle: '我的订单',
  //   headerTintColor: '#111',
  //   headerStyle: {
  //     backgroundColor: '#f5f5f5',
  //     opacity: 1,
  //   },
  // });
  toast(text) {
    Alert.alert('温馨提示', text, [{text: '确定'}], {cancelable: false});
  }

  getMovie() {
    storage
      .load({key: 'movies'})
      .then(res => {
        res = JSON.parse(res);
        this.setState({movies: res});
      })
      .catch(err => {
        this.setState({movies: []});
      });
  }
  delete(i) {
    let data = this.state.movies.slice();
    data.splice(i, 1);
    this.setState({movies: data});
    this.toast('删除成功！');
    storage.save({key: 'movies', data: JSON.stringify(data)});
  }

  toast(text) {
    Alert.alert('温馨提示', text, [{text: '确定'}], {cancelable: false});
  }

  render() {
    const {navigate} = this.context;
    let {movies} = this.state;
    return (
      // <ScrollView bounces={true} scrollEventThrottle={1}>
      <SafeAreaView>
        {!movies || movies.length === 0 ? (
          <View
            style={{
              flexWrap: 'nowrap',
              flexDirection: 'row',
              justifyContent: 'center',
              padding: 30,
            }}>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '500',
                color: '#333',
                textAlign: 'center',
                paddingVertical: 8,
              }}>
              暂无订单，
            </Text>
            <Text
              style={{
                fontSize: 14,
                fontWeight: '900',
                color: '#FF4E65',
                textAlign: 'center',
                padding: 8,
                borderColor: '#FF4E65',
                borderWidth: 1,
                borderRadius: 4,
              }}
              onPress={() => {
                navigate('Home');
              }}>
              快去下单吧！
            </Text>
          </View>
        ) : (
          <View>
            <FlatList
              data={movies}
              onRefresh={this._refreshDate}
              refreshing={this.state.refreshing}
              keyExtractor={(item, i) => i.toString()}
              renderItem={({item, i}) => {
                return (
                  <View style={[styles.hotList]}>
                    <View style={styles.spaceBetween}>
                      <Text style={styles.title}>{item.title}</Text>

                      <Icon
                        name="delete"
                        onPress={() => {
                          this.delete(i);
                        }}
                        size={18}
                        style={{paddingLeft: 12, color: '#666'}}></Icon>
                    </View>
                    <View style={styles.listitem}>
                      <View
                        style={{
                          width: 80,
                          justifyContent: 'flex-start',
                        }}>
                        <Image
                          source={{uri: item.url}}
                          style={{
                            // width: 80,
                            height: 80,
                          }}
                        />
                      </View>
                      <View
                        style={{
                          flex: 1,
                          flexDirection: 'column',
                          justifyContent: 'center',
                          marginLeft: 12,
                        }}>
                        <View style={styles.spaceBetween}>
                          <Text style={styles.smallFont}>{item.mess}</Text>
                          <Text style={styles.smallFont}>
                            票数：{item.count}
                          </Text>
                        </View>
                        <Text style={styles.smallFont}>
                          取票人：{item.account}
                        </Text>
                        <Text style={styles.smallFont}>
                          联系方式：{item.phone}
                        </Text>
                      </View>
                    </View>
                  </View>
                );
              }}
            />
          </View>
        )}
      </SafeAreaView>
      // </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  smallFont: {
    lineHeight: 20,
    color: '#666',
    fontSize: 14,
  },
  loadding: {
    marginTop: 100,
  },
  star: {
    width: 12,
    height: 12,
    marginRight: 2,
  },
  hotList: {
    padding: 12,
    flexDirection: 'column',
    backgroundColor: '#fff',
    borderRadius: 6,
    margin: 6,
  },
  lastList: {
    borderBottomWidth: 0,
  },
  title: {
    fontWeight: '900',
    fontSize: 15,
  },
  pay: {
    width: 50,
    height: 25,
    marginLeft: 20,
    marginVertical: 6,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FF4E65',
    borderRadius: 5,
  },
  spaceBetween: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  listitem: {
    flexDirection: 'row',
    marginTop: 6,
  },
});
