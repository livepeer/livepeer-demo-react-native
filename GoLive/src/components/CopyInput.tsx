import React from 'react';
import {Div, Input, Icon, Text, Button} from 'react-native-magnus';
import Clipboard from '@react-native-community/clipboard';
import Toast from 'react-native-simple-toast';

export const CopyInput: React.FC<{
  label: string;
  value: string;
}> = props => (
  <Div pb="md">
    <Text fontWeight="bold" fontSize="xl" mt="sm" mb="sm">
      {props.label}
    </Text>
    <Input
      editable={false}
      value={props.value}
      fontSize="normal"
      suffix={
        <Button
          bg="transparent"
          m={0}
          onPress={() => {
            Clipboard.setString(props.value);
            Toast.show(`Copied ${props.label}!`);
          }}>
          <Icon name="copy1" color="gray400" />
        </Button>
      }
    />
  </Div>
);
