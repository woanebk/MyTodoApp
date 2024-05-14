/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react'; 
import { NavigationContainer } from '@react-navigation/native';
import {
  StyleSheet,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ListTodoScreen from './src/screens/ListTodoScreen'; 
import ListGroupScreen from './src/screens/ListGroupScreen';
import TodoDetailsScreen from './src/screens/TodoDetailsScreen';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet'; 
import { RootStackParamList } from './src/navigation/types';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GroupProvider from './src/context/GroupProvider';

const RootStack = createNativeStackNavigator<RootStackParamList>();

function App(): React.JSX.Element {

  return (
    <GestureHandlerRootView>
      <GroupProvider>
        <BottomSheetModalProvider>
          <NavigationContainer>
            <RootStack.Navigator
              initialRouteName={'ListGroup'}
            >
              <RootStack.Screen name={'ListGroup'} component={ListGroupScreen}
                options={{ title: 'My To do app' }} />
              <RootStack.Screen name={'ListTodo'} component={ListTodoScreen}
                options={{ title: 'List To do' }} />
              <RootStack.Screen name={'TodoDetails'} component={TodoDetailsScreen}
                options={{ title: '' }} />
            </RootStack.Navigator>
          </NavigationContainer>
        </BottomSheetModalProvider>
      </GroupProvider>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
});

export default App;
