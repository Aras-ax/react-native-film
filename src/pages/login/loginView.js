import {
  StyleSheet,
  Text,
  View,
  Button,
  Dimensions,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import React, {Component} from 'react';
import {NavigationContext} from '@react-navigation/native';
const {width, height} = Dimensions.get('window');

export default class Login extends Component {
  static contextType = NavigationContext;

  constructor(props) {
    super(props);
    this.state = {
      user: '',
      password: '',
      visible: false,
    };

    storage.save({key: 'hasLogin', data: false});
  }
  static navigationOptions = {
    header: null,
  };

  checkUser() {
    if (this.state.user === '') {
      this.toast('请输入用户名。');
      return;
    }
    if (this.state.password === '') {
      this.toast('请输入密码。');
      return;
    }
    storage
      .load({key: this.state.user})
      .then(res => {
        if (res === this.state.password) {
          storage.save({key: 'hasLogin', data: true});
          this.context.navigate('Home');
        } else {
          this.toast('密码错误！');
        }
      })
      .catch(err => {
        if (this.state.user === 'minifilm') {
          if (this.state.password === 'mini520') {
            storage.save({key: 'hasLogin', data: true});
            this.context.navigate('Home');
          } else {
            this.toast('密码错误！');
          }
        } else {
          this.toast('用户不存在，请注册！');
        }
      });
  }

  toast(text) {
    Alert.alert('温馨提示', text, [{text: '确定'}], {cancelable: false});
  }

  render() {
    const {navigate} = this.context;
    return (
      <ScrollView
        bounces={true}
        scrollEventThrottle={1}
        style={{backgroundColor: '#23223d'}}>
        <View
          style={styles.box}
          style={{
            width,
            minHeight: height,
            flexDirection: 'column',
            paddingHorizontal: 40,
            flex: 1,
            paddingTop: 80,
            paddingBottom: 80,
            backgroundColor: '#23223d',
            position: 'relative',
          }}>
          <Text style={styles.title}>登录</Text>
          <View>
            <TextInput
              style={styles.input}
              placeholderTextColor="#9B9B9B"
              maxLength={24}
              placeholder="请输入用户名/邮箱"
              autoCapitalize="none"
              onChangeText={text => this.setState({user: text})}></TextInput>
            <TextInput
              style={styles.input}
              placeholderTextColor="#9B9B9B"
              autoCapitalize="none"
              maxLength={24}
              placeholder="请输入密码"
              onChangeText={text =>
                this.setState({password: text})
              }></TextInput>
          </View>
          <View
            style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
            <TouchableOpacity activeOpacity={0.8} style={styles.btnfull}>
              <Button
                title="登录"
                color="#fff"
                onPress={() => {
                  this.checkUser();
                }}></Button>
            </TouchableOpacity>
            <Text
              onPress={() => navigate('Register', {title: '修改密码'})}
              style={styles.btn}>
              忘记密码?
            </Text>
          </View>
          <View style={styles.register}>
            <Text
              style={{
                fontSize: 18,
                color: '#fff',
                width: '100%',
                textAlign: 'center',
              }}
              onPress={() => navigate('Register', {title: '注册'})}>
              注册
            </Text>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 32,
    color: '#fff',
    paddingBottom: 40,
    textAlign: 'center',
  },
  input: {
    borderBottomColor: '#fff',
    borderBottomWidth: 1,
    marginVertical: 14,
    color: '#fff',
    paddingVertical: 2,
  },
  btn: {
    color: '#fff',
    textAlign: 'center',
    width: 120,
    fontSize: 16,
    padding: 14,
    alignItems: 'center',
    textDecorationColor: '#fff',
    textDecorationLine: 'underline',
  },
  btnfull: {
    borderRadius: 4,
    backgroundColor: '#FF4E65',
    width: 140,
    padding: 8,
    marginTop: 40,
  },
  register: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#322f55',
  },
});
