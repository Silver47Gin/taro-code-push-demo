### 设置环境

- 根据[Taro 文档](https://docs.taro.zone/docs/react-native)和[ReactNative 文档](https://reactnative.dev/docs/environment-setup)搭建开发环境。
- 安装[apktool](https://ibotpeaches.github.io/Apktool/install/)
- 安装依赖

```
$ yarn install
$ yarn podInstall
$ yarn global add appcenter-cli
```

### 开发流程

1. 注册 appcenter 的账号，[地址](https://appcenter.ms/create-account)
2. 命令行登录 appcenter

```
$ appcenter login
```

3. 将`scripts/env.sh`中的`CODE_PUSH_USERNAME`导出值替换为自己的`username`

```
$ appcenter profile list
Username:     silver47gin-gmail.com
Display Name: silver47gin
Email:        silver47gin@gmail.com
```

4. 创建 appcenter 应用，将下面的`ANDROID_CODE_PUSH_APP`和`IOS_CODE_PUSH_APP`替换为自己的。并替换`scripts/env.sh`中的`ANDROID_CODE_PUSH_APP`和`IOS_CODE_PUSH_APP`。

```
$ appcenter apps create -d ANDROID_CODE_PUSH_APP -o Android -p React-Native
$ appcenter apps create -d IOS_CODE_PUSH_APP -o iOS -p React-Native
```

5. 创建 appcenter 应用的`deployment`

```
$ source scripts/envs.sh
$ appcenter codepush deployment add -a $CODE_PUSH_USERNAME/$ANDROID_CODE_PUSH_APP Production
$ appcenter codepush deployment add -a $CODE_PUSH_USERNAME/$IOS_CODE_PUSH_APP Production
```

6. 获取 `deployment` 对应的`key`，对应修改`android\gradle.properties`中的`release_codepush_key=$ANDROID_CODE_PUSH_KEY`和`ios\taroDemo\Info.plist`中的`<string>$IOS_CODE_PUSH_KEY</string>`

```
$ source scripts/envs.sh
$ appcenter codepush deployment list -a "$CODE_PUSH_USERNAME/$ANDROID_CODE_PUSH_APP" -k
$ appcenter codepush deployment list -a "$CODE_PUSH_USERNAME/$IOS_CODE_PUSH_APP" -k
```

7. 根据[网址](https://reactnative.dev/docs/signed-apk-android)生成安卓对应的 keystore，放到`android\app`文件夹下，对应修改`android\gradle.properties`中的配置

```
release_keystore_file=$RELEASE_KEYSTORE_FILE
release_keystore_password=$RELEASE_KEYSTORE_PASSWORD
release_keystore_key_alias=$RELEASE_KEYSTORE_KEY_ALIAS
release_keystore_key_password=$RELEASE_KEYSTORE_KEY_PASSWORD
```

### 编译以及打包流程

## 安卓端调试

```bash
$ yarn start
$ yarn android
```

## 安卓端打包

- 此处存在 bug，第一次运行`./gradlew assemble`后，可能生成的 apk 中没有`index.bundle.js`，需要运行两次`./gradlew assemble`命令，目前原因不明。

```bash
$ yarn build:android
$ yarn install:android
```

## 安卓端更新 bundle

```bash
$ source scripts/envs.sh
$ yarn bundle:android
$ appcenter codepush release -c .temp/android -a "$CODE_PUSH_USERNAME/$ANDROID_CODE_PUSH_APP" -t "*" -d Production
```

## ios 端调试

```bash
$ yarn start
$ yarn ios
```

## ios 打包

- 使用 xcode 打开 ios 文件夹
- 选择 taroDemo 的 Scheme 和 Any Device 的 Destination
- 点击菜单上的 Product -> Archive
- 点击菜单中的 Window -> Organizar
- 选中生成的 Archive，点击 Distribute APP，按照需要选择后续

## ios 更新 bundle

```bash
$ source scripts/envs.sh
$ yarn bundle:ios
$ appcenter codepush release -c .temp/ios -a "$CODE_PUSH_USERNAME/$IOS_CODE_PUSH_APP" -t "*" -d Production
```
