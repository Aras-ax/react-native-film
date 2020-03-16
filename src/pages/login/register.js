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
  SafeAreaView,
} from 'react-native';
import React, {Component} from 'react';
import {NavigationContext, useRoute} from '@react-navigation/native';
const {width, height} = Dimensions.get('window');

class Register extends Component {
  static contextType = NavigationContext;

  constructor(props) {
    super(props);
    this.state = {
      user: '',
      password: '',
      userError: '',
      passError: '',
    };
  }

  userChange(text) {
    let userError = '';
    if (text === '') {
      userError = '用户名不能为空';
    } else if (/[^0-9a-z]/i.test(text)) {
      userError = '用户名只能包含数字和字母';
    }
    this.setState({userError});
    if (text) {
      this.setState({user: text});
    }
  }

  passChange(text) {
    let passError = '';
    if (text === '') {
      passError = '密码不能为空';
    } else if (/[^0-9a-z]/i.test(this.state.password)) {
      passError = '密码只能包含数字和字母';
    }
    this.setState({passError});
    if (text) {
      this.setState({password: text});
    }
  }

  saveData() {
    this.passChange(this.state.password);
    this.userChange(this.state.user);
    setTimeout(() => {
      if (!!this.state.userError || !!this.state.passError) {
        this.toast('请检查错误输入项');
        return;
      }
      storage.save({key: this.state.user, data: this.state.password});
      this.toast('账号设置成功！');
      this.context.navigate('Login');
    }, 0);
  }

  toast(text) {
    Alert.alert('温馨提示', text, [{text: '确定'}], {cancelable: false});
  }

  render() {
    const {route} = this.props;
    let text = route.params.title;
    let btnText = '注册';
    if (text !== '注册') {
      btnText = '确定';
    }

    return (
      <SafeAreaView style={{backgroundColor: '#23223d'}}>
        <ScrollView
          bounces={true}
          scrollEventThrottle={1}
          style={{backgroundColor: '#23223d'}}>
          <View
            style={{
              width,
              minHeight: height,
              flexDirection: 'column',
              paddingHorizontal: 40,
              flex: 1,
              paddingTop: 20,
              paddingBottom: 80,
              backgroundColor: '#23223d',
              position: 'relative',
            }}>
            <Text style={styles.title}>{text}</Text>
            <View style={styles.inputBox}>
              <TextInput
                style={styles.input}
                placeholderTextColor="#9B9B9B"
                maxLength={24}
                autoCapitalize="none"
                placeholder="请输入用户名"
                onChangeText={text => this.userChange(text)}></TextInput>
              <Text
                style={{color: '#ff8c8c', position: 'absolute', bottom: -1}}>
                {this.state.userError}
              </Text>
            </View>
            <View style={styles.inputBox}>
              <TextInput
                style={styles.input}
                placeholderTextColor="#9B9B9B"
                autoCapitalize="none"
                maxLength={24}
                placeholder="请输入密码"
                onChangeText={text => this.passChange(text)}></TextInput>
              <Text
                style={{color: '#ff8c8c', position: 'absolute', bottom: -1}}>
                {this.state.passError}
              </Text>
            </View>
            <View
              style={{flex: 1, flexDirection: 'column', alignItems: 'center'}}>
              <TouchableOpacity activeOpacity={0.8} style={styles.btnfull}>
                <Button
                  title={btnText}
                  color="#fff"
                  onPress={() => {
                    this.saveData();
                  }}></Button>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

export default function(props) {
  const route = useRoute();
  return <Register {...props} route={route}></Register>;
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
    backgroundColor: '#1ca076',
  },
  inputBox: {
    position: 'relative',
  },
  error: {
    color: '#f00',
    position: 'absolute',
    bottom: 0,
  },
});
