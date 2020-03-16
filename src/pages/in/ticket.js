import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  Alert,
} from 'react-native';
import React, {Component} from 'react';
import {useRoute} from '@react-navigation/native';
const {width, height} = Dimensions.get('window');
import Star from '../../components/star';
import {HOST_URL, DETAIL} from '../../commons/API';

const movieInfo = `${HOST_URL}/v2/movie/subject`;
// const yingren = 'https://api.douban.com/v2/movie/celebrity/';"26363254"
class Ticket extends Component {
  constructor(props) {
    super(props);
    this.state = {
      num: 3,
      data: [],
      ready: true,
      date: '',
      count: '',
      selected: 0,
      phone: '',
      account: '',
    };
  }

  // static navigationOptions = ({navigation}) => ({
  //   headerTitle: '在线购票',
  //   // headerRight: <Button title="分享" onPress={() => alert("点击了分享")} />,
  //   headerTintColor: '#fff',
  //   headerStyle: {
  //     backgroundColor: '#FF4E65',
  //     opacity: 1,
  //   },
  // });

  // https://api.douban.com/v2/movie/subject/26363254?apikey=0b2bdeda43b5688921839c8ecb20399b&city=北京&client=something&udid=dddddddddddddddddddddd
  componentDidMount() {
    const {
      route: {
        params: {id},
      },
    } = this.props;

    let formData = new FormData();
    formData.append('apikey', '0b2bdeda43b5688921839c8ecb20399b');
    formData.append('city', '北京');
    formData.append('client', 'something');
    formData.append('udid', 'dddddddddddddddddddddd');

    fetch(`${movieInfo}/${id}`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'multipart/form-data',
      },
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        this.setState({
          ready: false,
          data: data || DETAIL,
        });
      })
      .catch(error => {
        this.setState({
          ready: false,
          data: DETAIL,
        });
      });
  }
  toast(text) {
    Alert.alert('温馨提示', text, [{text: '确定'}], {cancelable: false});
  }

  saveData(title, mess, url) {
    let {count, account, phone, selected} = this.state;
    if (count == '' || count == '0') {
      this.toast('请输入购票数量！');
      return;
    }
    if (account == '') {
      this.toast('请输入联系人信息！');
      return;
    }
    if (phone == '') {
      this.toast('请输入取件人的联系方式！');
      return;
    }

    this.toast(
      `您已购买${this.times[selected].time}的电影票${count}张，您可到【我的订单】中查看订单信息，祝您观影愉快。`,
    );
    // 写入数据
    storage
      .load({key: 'movies'})
      .then(res => {
        res = JSON.parse(res);
        res.push({
          id: res.length + 1,
          title,
          mess,
          phone,
          account,
          count,
          url,
        });
        storage.save({key: 'movies', data: JSON.stringify(res)});
      })
      .catch(err => {
        storage.save({
          key: 'movies',
          data: JSON.stringify([
            {
              id: 1,
              title,
              mess,
              phone,
              account,
              count,
              url,
            },
          ]),
        });
      });

    this.props.navigation.goBack();
  }

  render() {
    let ticketTime = [],
      types = ['IMAX', 'CINETECH', 'IMAX 3D', 'IMAX 3D'];
    let hour = new Date().getHours(),
      j = 1;
    for (let i = 1; i < 6; i++) {
      hour++;
      if (hour >= 24) {
        break;
      }
      ticketTime.push({time: hour + ':00', type: types[j++ % 4]});
      if (j > 9) {
        break;
      }
      ticketTime.push({time: hour + ':30', type: types[j++ % 4]});
    }
    this.times = ticketTime;

    const {
      title,
      year,
      countries,
      genres,
      summary,
      ratings_count,
      mainland_pubdate,
      durations,
      photos,
      images,
      casts,
      rating,
      popular_comments,
    } = this.state.data;
    return (
      <ScrollView bounces={false} scrollEventThrottle={1}>
        {this.state.ready ? (
          <ActivityIndicator size="large" style={{marginTop: 100}} />
        ) : (
          <View style={{backgroundColor: '#23223d'}}>
            <View style={styles.poster}>
              <Image
                source={{uri: images.large}}
                style={{
                  width: width / 2,
                  height: 280,
                }}
              />
            </View>
            <View style={styles.movieInfo}>
              <View>
                <Text
                  style={{
                    fontSize: 22,
                    fontWeight: '600',
                    marginBottom: 5,
                    color: '#fff',
                  }}>
                  {title}
                </Text>
                <Text style={styles.smallFont}>
                  {year} / {countries} / {genres}
                </Text>
                <Text style={styles.smallFont}>
                  上映时间: {mainland_pubdate}({countries})
                </Text>
                <Text style={styles.smallFont}>片长: {durations}</Text>
              </View>
              <View style={styles.infoSquare}>
                <Text style={styles.smallFont}>豆瓣评分</Text>
                <Text style={{fontSize: 20, fontWeight: '600'}}>
                  {rating.average}
                </Text>
                <View style={{marginBottom: 3, marginTop: 2}}>
                  <Star value={rating.stars} width={11} height={11} />
                </View>
                <Text style={styles.smallFont}>{ratings_count}人</Text>
              </View>
            </View>
            <View>
              <Text style={styles.bar}>在线购票</Text>
            </View>
            <View
              style={{
                marginTop: 30,
                flexDirection: 'row',
                justifyContent: 'space-around',
                paddingLeft: 10,
                paddingRight: 10,
              }}></View>
            <View style={{paddingRight: 10, paddingLeft: 10}}>
              <View style={styles.formRow}>
                <Text style={styles.formTitle}>观影时间</Text>
                <View style={styles.timeBox}>
                  {ticketTime.map((item, i) => {
                    return (
                      <TouchableOpacity
                        activeOpacity={0.8}
                        style={
                          i === this.state.selected
                            ? styles.activeItem
                            : styles.timeItem
                        }
                        key={item.time}
                        onPress={() => {
                          this.setState({selected: i});
                        }}>
                        <Text style={styles.filmTime}>{item.time}</Text>
                        <Text style={styles.filmType}>{item.type}</Text>
                      </TouchableOpacity>
                    );
                  })}
                </View>
              </View>
              <View style={styles.formRow}>
                <Text style={styles.formTitle}>购买票数</Text>
                <TextInput
                  maxLength={2}
                  keyboardType="numeric"
                  style={styles.formInput}
                  onChangeText={text => {
                    this.setState({count: text});
                  }}></TextInput>
              </View>
              <View style={styles.formRow}>
                <Text style={styles.formTitle}>联系人</Text>
                <TextInput
                  style={styles.formInput}
                  maxLength={32}
                  onChangeText={text => {
                    this.setState({account: text});
                  }}></TextInput>
              </View>
              <View style={styles.formRow}>
                <Text style={styles.formTitle} maxLength={24}>
                  联系方式
                </Text>
                <TextInput
                  style={styles.formInput}
                  keyboardType="numeric"
                  onChangeText={text => {
                    this.setState({phone: text});
                  }}></TextInput>
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                  activeOpacity={0.8}
                  style={styles.btnfull}
                  onPress={() => {
                    this.saveData(
                      title,
                      `${year}/${countries}/${genres}`,
                      images.small,
                    );
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      padding: 14,
                      fontSize: 16,
                      flex: 1,
                      textAlign: 'center',
                    }}>
                    购买
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    );
  }
}

export default function(props) {
  const route = useRoute();
  return <Ticket {...props} route={route}></Ticket>;
}
const styles = StyleSheet.create({
  poster: {
    backgroundColor: '#23223d',
    height: 310,
    width: width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  introduce: {
    color: '#343334',
  },
  movieInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: 15,
    paddingRight: 15,
    paddingTop: 15,
  },
  infoSquare: {
    backgroundColor: '#FFFFFF',
    width: 85,
    height: 85,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#9B9B9B',
    shadowOffset: {height: 0, width: 0},
    shadowRadius: 10,
    shadowOpacity: 0.5,
  },
  smallFont: {
    fontSize: 11,
    color: '#9B9B9B',
  },
  formRow: {
    flex: 1,
    flexDirection: 'column',
    marginTop: 12,
  },
  formTitle: {
    paddingVertical: 6,
    color: '#9B9B9B',
  },
  formInput: {
    backgroundColor: '#322f55',
    borderRadius: 4,
    marginBottom: 6,
    paddingVertical: 6,
    color: '#fff',
  },
  bar: {
    backgroundColor: '#322f55',
    color: '#fff',
    padding: 14,
    marginTop: 28,
    marginHorizontal: 0,
    borderRadius: 4,
    fontSize: 16,
  },
  timeBox: {
    backgroundColor: '#322f55',
    padding: 6,
    borderRadius: 12,
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  timeItem: {
    width: '31%',
    marginVertical: 6,
    padding: 6,
    borderRadius: 4,
    borderColor: '#9B9B9B',
    borderWidth: 1,
    flexDirection: 'column',
  },
  activeItem: {
    backgroundColor: '#434666',
    width: '31%',
    marginVertical: 6,
    padding: 6,
    borderRadius: 4,
    borderColor: '#9B9B9B',
    borderWidth: 1,
    flexDirection: 'column',
  },
  filmTime: {
    fontSize: 20,
    color: '#fff',
  },
  filmType: {
    fontSize: 12,
    color: 'yellow',
    marginTop: 6,
  },
  btnfull: {
    borderRadius: 4,
    backgroundColor: '#FF4E65',
    width: '90%',
    marginTop: 40,
    marginBottom: 40,
  },
});
