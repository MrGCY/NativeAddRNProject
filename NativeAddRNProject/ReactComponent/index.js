import { AppRegistry } from 'react-native';
import App from './App';
import firstView from './Components/index1.ios';
import secondView from './Components/index2.ios';
import thirdView from './Components/index3.ios';

AppRegistry.registerComponent('nativeAddRN', () => App);
AppRegistry.registerComponent('firstView', () => firstView);
AppRegistry.registerComponent('secondView', () => secondView);
AppRegistry.registerComponent('thirdView', () => thirdView);