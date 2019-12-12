import React from 'react';
import {createAppContainer} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';
import CreateScreen from './src/screens/CreateScreen';
import ReadScreen from './src/screens/ReadScreen';
import UpdateScreen from './src/screens/UpdateScreen';
import DeleteScreen from './src/screens/DeleteScreen';

const navigation = createStackNavigator({
  Create: CreateScreen,
  Read: ReadScreen,
  Update: UpdateScreen,
  Delete: DeleteScreen
}, {
  initialRouteName: 'Create'
})

export default createAppContainer(navigation);
