import React from 'react';
import {Button} from 'react-native-magnus';

export const PrimaryButton: React.FC<React.ComponentProps<typeof Button>> =
  props => {
    return (
      <Button
        block
        p={16}
        bg="#943CFF"
        color="white"
        letterSpacing={0.5}
        fontWeight="600"
        fontSize="normal"
        rounded={6}
        {...props}
      />
    );
  };
