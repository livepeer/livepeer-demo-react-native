import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {Div} from 'react-native-magnus';
import {PrimaryButton} from '../components/PrimaryButton';
import {SecondaryButton} from '../components/SecondaryButton';
import {VideoBackground} from '../components/VideoBackground';
import {Screen} from '../components/Screen';
import {HOME_VIDEO_BG_URL} from '../constants';
import {useAPIKeyStore} from '../hooks/useAPIKeyStore';

export function Home() {
  const navigation = useNavigation();
  const hasAPIKey = useAPIKeyStore(state => state.key);
  const onStartBroadcasting = () => {
    navigation.navigate(hasAPIKey ? 'broadcast_stream' : 'enter_api_key');
  };
  const onStartWatching = () => {
    navigation.navigate('enter_playback_url');
  };
  return (
    <Screen>
      <VideoBackground source={{uri: HOME_VIDEO_BG_URL}} />
      <Div p={80}>
        <PrimaryButton onPress={onStartBroadcasting}>
          Broadcast a Stream
        </PrimaryButton>
        <SecondaryButton mt="lg" onPress={onStartWatching}>
          Watch a Stream
        </SecondaryButton>
      </Div>
    </Screen>
  );
}
