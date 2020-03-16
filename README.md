# react-native-film

基于 React Native V0.61 版本的 IOS App，没有对安卓进行适配。

# 数据 API

使用豆瓣免费 API，详见https://github.com/zce/douban-api-docs

# 预览

![预览](./src/img/view.png)

# 运行
react native 0.60以后的版本，ios开发需要CocoaPods进行第三方依赖的安装，国内环境很难装成功，需要翻墙或者参考官网的方法。

克隆代码到本地运行。

```
git clone https://github.com/moshang-xc/react-native-film.git

cd react-native-film

npm i

cd ios

pod install

cd ..

npm run ios 或 npx react-native run-ios
```
