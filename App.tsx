/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import {
  StyleSheet,
} from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import ListTodoScreen from './src/screens/ListTodoScreen';
import { NavigationKeys } from './src/utils/navigationKeys';
import ListGroupScreen from './src/screens/ListGroupScreen';
import TodoDetailsScreen from './src/screens/TodoDetailsScreen';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {

  return (
    <GestureHandlerRootView>
      <BottomSheetModalProvider>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName={NavigationKeys.listGroup}
          >
            <Stack.Screen name={NavigationKeys.listGroup} component={ListGroupScreen}
              options={{ title: 'List Group' }} />
            <Stack.Screen name={NavigationKeys.listTodo} component={ListTodoScreen}
              options={{ title: 'List To do' }} />
            <Stack.Screen name={NavigationKeys.todoDetails} component={TodoDetailsScreen}
              options={{ title: '' }} />
          </Stack.Navigator>
        </NavigationContainer>
      </BottomSheetModalProvider>
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
