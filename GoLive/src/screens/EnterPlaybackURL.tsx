import React, {useCallback, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Linking} from 'react-native';
import {Icon, Input, Div, Text} from 'react-native-magnus';
import {CloseButton} from '../components/CloseButton';
import {PrimaryButton} from '../components/PrimaryButton';
import {Screen} from '../components/Screen';
import {PLAYBACK_LIVE_STREAM_HELP_URL} from '../constants';

export function EnterPlaybackURL() {
  const navigation = useNavigation();
  const [value, setValue] = useState('');
  const canSubmit = value.startsWith('https://');
  const onSubmit = useCallback(async () => {
    navigation.navigate('view_stream', {
      playbackURL: value,
    });
  }, [navigation, value]);
  return (
    <Screen>
      <CloseButton color="black" />

      <Icon
        name="playcircleo"
        color="black"
        fontSize={72}
        h={120}
        w={120}
        rounded="circle"
        bg="white"
      />

      <Div p={40}>
        <Text fontSize={24} fontWeight="600">
          Enter A Stream Playback URL
        </Text>
        <Text>
          Find out how to playback a live stream{' '}
          <Text
            color="blue"
            onPress={() => Linking.openURL(PLAYBACK_LIVE_STREAM_HELP_URL)}>
            here
          </Text>
        </Text>

        <Div pb={40} />

        <Input
          h={60}
          shadow="2xl"
          placeholder="https://livepeercdn.com/hls/{playbackId}/index.m3u8"
          defaultValue={value}
          onChangeText={setValue}
        />

        <PrimaryButton mt="lg" disabled={!canSubmit} onPress={onSubmit}>
          Submit
        </PrimaryButton>
      </Div>
    </Screen>
  );
}
