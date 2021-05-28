import React from 'react';
import {useNavigation} from '@react-navigation/core';
import {Button, Icon} from 'react-native-magnus';

export const CloseButton: React.FC<{
  color: 'white' | 'black';
  onBeforeClose?(): void;
}> = ({color, onBeforeClose}) => {
  const navigation = useNavigation();
  const isDark = color === 'black';
  const shadow = isDark ? '' : 'heavy';
  return (
    <Button
      color={color}
      shadow={shadow}
      shadowColor="black"
      bg="transparent"
      position="absolute"
      top={0}
      right={0}
      onPress={() => {
        onBeforeClose?.();
        navigation.goBack();
      }}>
      <Icon name="close" color={color} fontSize={32} h={50} w={50} />
    </Button>
  );
};
