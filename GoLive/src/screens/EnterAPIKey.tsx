import React, {useCallback, useRef, useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import {Linking} from 'react-native';
import {Icon, Input, Div, Text, Snackbar} from 'react-native-magnus';
import {CloseButton} from '../components/CloseButton';
import {PrimaryButton} from '../components/PrimaryButton';
import {Screen} from '../components/Screen';
import {API_KEY_LEN, CREATE_API_KEY_HELP_URL} from '../constants';
import {useAPIKeyStore} from '../hooks/useAPIKeyStore';

export function EnterAPIKey() {
  const navigation = useNavigation();
  const errorSnackbarRef = useRef<Snackbar>(null);
  const [value, setValue] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const canSubmit = value.length === API_KEY_LEN && !isSubmitting;
  const apiKeyStore = useAPIKeyStore();
  const onSubmit = useCallback(async () => {
    try {
      setIsSubmitting(true);
      console.log(value);
      apiKeyStore.save(value);
      navigation.navigate('broadcast_stream');
    } catch (err) {
      console.log('ERROR MESSAGE', err.message);
      errorSnackbarRef.current?.show(err.message, {
        duration: 8000,
        suffix: <Icon name="exclamationcircleo" color="white" fontSize="md" />,
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [setIsSubmitting, value, apiKeyStore, navigation, errorSnackbarRef]);
  return (
    <>
      <Screen>
        <CloseButton color="black" />

        <Icon
          name="key"
          color="black"
          fontSize={72}
          h={120}
          w={120}
          rounded="circle"
          bg="white"
          style={{transform: [{rotate: '135deg'}]}}
        />

        <Div p={40}>
          <Text fontSize={24} fontWeight="600">
            Enter Your API Key
          </Text>
          <Text>
            Find out how to get your API key{' '}
            <Text
              color="blue"
              onPress={() => Linking.openURL(CREATE_API_KEY_HELP_URL)}>
              here
            </Text>
          </Text>

          <Div pb={40} />

          <Input
            h={60}
            shadow="2xl"
            placeholder="xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
            defaultValue={value}
            maxLength={API_KEY_LEN}
            onChangeText={setValue}
          />

          <PrimaryButton mt="lg" disabled={!canSubmit} onPress={onSubmit}>
            {isSubmitting ? 'Authenticating...' : 'Submit'}
          </PrimaryButton>
        </Div>
      </Screen>
      <Snackbar ref={errorSnackbarRef} bg="red" color="white" />
    </>
  );
}
