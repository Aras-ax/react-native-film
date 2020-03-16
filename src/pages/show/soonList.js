/* @flow */

import React, {Component} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import {HOST_URL, SOON_LIST} from '../../commons/API';
import {NavigationContext} from '@react-navigation/native';

export default class SoonList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ready: true,
      refreshing: false,
      movies: [],
    };
  }

  static contextType = NavigationContext;

  componentDidMount() {
    this._fatchData();
  }
  _fatchData = () => {
    fetch(`${HOST_URL}/v2/movie/coming_soon`)
      // 转换成 Text  是为了当意外发生时,更容易锁定错误
      .then(response => {
        this.setState({refreshing: false});
        return response.json();
      })
      .then(responseText => {
        let arrData = responseText.subjects || SOON_LIST;

        this.setState({
          movies: arrData.map((item, i) => {
            return {key: i, value: item};
          }),
          ready: false,
          refreshing: false,
        });
      })
      .catch(error => {
        this.setState({
          movies: SOON_LIST.map((item, i) => {
            return {key: i, value: item};
          }),
          ready: false,
          refreshing: false,
        });
      });
  };
  _refreshDate = () => {
    this.setState({refreshing: true});
    this._fatchData();
  };
  render() {
    const {movies} = this.state;
    const {navigate} = this.context;
    return (
      <View>
        {this.state.ready ? (
          <ActivityIndicator size="large" style={styles.loadding} />
        ) : (
          <FlatList
            data={movies}
            onRefresh={this._refreshDate}
            refreshing={this.state.refreshing}
            keyExtractor={(item, i) => i.toString()}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  style={[
                    styles.hotList,
                    item.key + 1 == movies.length && styles.lastList,
                  ]}
                  key={item.value.id}
                  onPress={() =>
                    navigate('Detail', {
                      id: item.value.id,
                    })
                  }>
                  <View
                    style={{
                      flex: 1,
                    }}>
                    <Image
                      source={{
                        uri: item.value.images.large.replace('webp', 'png'),
                      }}
                      style={{
                        width: 80,
                        height: 100,
                      }}
                    />
                  </View>
                  <View
                    style={{
                      flex: 2,
                      alignItems: 'flex-start',
                    }}>
                    <Text style={styles.title}>{item.value.title}</Text>
                    <Text style={styles.smallFont}>
                      导演：
                      {item.value.directors.length > 0
                        ? item.value.directors[0].name
                        : ''}
                    </Text>
                    <Text style={styles.smallFont}>
                      主演：{item.value.casts.map(v => v.name).join('/')}
                    </Text>
                    <Text
                      style={{
                        lineHeight: 20,
                        fontSize: 13,
                      }}>
                      {item.value.collect_count}人想看
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 0,
                    }}>
                    <TouchableOpacity
                      onPress={() => {
                        navigate('Detail', {
                          id: item.value.id,
                        });
                      }}
                      style={styles.pay}>
                      <Text
                        style={{
                          color: '#FFAE31',
                          fontWeight: '900',
                        }}>
                        查看
                      </Text>
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  smallFont: {
    lineHeight: 20,
    color: '#A6A6A6',
    fontSize: 12,
  },
  loadding: {
    marginTop: 100,
  },
  star: {
    width: 12,
    height: 12,
    marginTop: 5,
    marginBottom: 5,
    marginRight: 2,
  },
  hotList: {
    height: 130,
    paddingLeft: 18,
    paddingRight: 18,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#EFEFEF',
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
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#FFAE31',
    borderRadius: 5,
  },
});
