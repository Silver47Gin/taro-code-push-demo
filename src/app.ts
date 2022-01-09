import { Component, ComponentClass } from "react";
import codepush from "react-native-code-push";

export const withCodePush = (C: ComponentClass) =>
  process.env.NODE_ENV === "development"
    ? C
    : codepush({
        checkFrequency: codepush.CheckFrequency.ON_APP_START,
        installMode: codepush.InstallMode.IMMEDIATE,
        updateDialog: true,
      })(C);

class App extends Component {
  componentDidMount() {}

  componentDidShow() {}

  componentDidHide() {}

  componentDidCatchError() {}

  render() {
    return this.props.children;
  }
}

const AppWithCodePush = withCodePush(App);

export default AppWithCodePush;
