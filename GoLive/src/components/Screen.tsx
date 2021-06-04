import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import {Div} from 'react-native-magnus';

export const Screen: React.FC<{children: React.ReactNode}> = props => (
  <Div style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <Div flex={1} h="100%" justifyContent="center" alignItems="center">
          {props.children}
        </Div>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  </Div>
);
