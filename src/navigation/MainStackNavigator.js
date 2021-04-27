import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import Planning from '../components/Planning'

import Scanner from '../components/Scanner'
//import Home from '../components/Home'

const Stack = createStackNavigator()

function MainStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen
          name='Home'
          component={Home}
          options={{ title: 'Home Screen' }}
        />
        <Stack.Screen
          name='Planning'
          component={Planning}
          options={{ title: 'Planning Screen' }}
/>
      </Stack.Navigator>
    </NavigationContainer>
  )
}

//export default MainStackNavigator
