import React from 'react';
import {SafeAreaView, StatusBar, useColorScheme} from 'react-native';
import {Colors} from 'react-native/Libraries/NewAppScreen';

import {ThemeProvider as MagnusThemeProvider} from 'react-native-magnus';
import AntDesign from 'react-native-vector-icons/AntDesign';

import {QueryClient, QueryClientProvider} from 'react-query';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

import {Home} from './screens/Home';
import {EnterAPIKey} from './screens/EnterAPIKey';
import {EnterPlaybackURL} from './screens/EnterPlaybackURL';
import {ViewStream} from './screens/ViewStream';
import {BroadcastStream} from './screens/BroadcastStream';

AntDesign.loadFont();

const queryClient = new QueryClient();

const RootStack = createStackNavigator();
const MainStack = createStackNavigator();

const RootStackScreen = () => (
  <RootStack.Navigator mode="modal">
    <RootStack.Screen
      name="main"
      options={{headerShown: false}}
      component={MainStackScreen}
    />
    <RootStack.Screen
      name="enter_api_key"
      options={{headerShown: false}}
      component={EnterAPIKey}
    />
    <RootStack.Screen
      name="enter_playback_url"
      options={{headerShown: false}}
      component={EnterPlaybackURL}
    />
  </RootStack.Navigator>
);

const MainStackScreen = () => (
  <MainStack.Navigator headerMode="float">
    <MainStack.Screen
      name="home"
      options={{
        title: 'Home',
        headerShown: false,
      }}
      component={Home}
    />
    <MainStack.Screen
      name="broadcast_stream"
      options={{
        title: 'Broadcast Stream',
        headerShown: false,
      }}
      component={BroadcastStream}
    />
    <MainStack.Screen
      name="view_stream"
      options={{
        title: 'View Stream',
        headerShown: false,
      }}
      component={ViewStream}
    />
  </MainStack.Navigator>
);

const theme = {
  fontSize: {
    normal: 16,
    bigText100: 32,
  },
  colors: {
    violet100: '#e1e1e1',
  },
  spacing: {
    xs: 2,
    '5xl': 64,
  },
  shadow: {
    heavy: {
      shadowOffset: {
        width: 0,
        height: 0,
      },
      shadowOpacity: 1,
      shadowRadius: 4.65,

      elevation: 4,
    },
  },
} as any;

export default () => {
  const isDarkMode = useColorScheme() === 'dark';
  return (
    <QueryClientProvider client={queryClient}>
      <MagnusThemeProvider theme={theme}>
        <SafeAreaView
          style={{
            flex: 1,
            backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
          }}>
          <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
          <NavigationContainer>
            <RootStackScreen />
          </NavigationContainer>
        </SafeAreaView>
      </MagnusThemeProvider>
    </QueryClientProvider>
  );
};
