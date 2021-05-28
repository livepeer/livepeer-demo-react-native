import React from 'react';
import {Button} from 'react-native-magnus';

export const SecondaryButton: React.FC<React.ComponentProps<typeof Button>> =
  props => {
    return (
      <Button
        block
        p={16}
        bg="transparent"
        color="white"
        borderColor="white"
        borderWidth={1}
        letterSpacing={0.5}
        fontWeight="600"
        fontSize="normal"
        rounded={6}
        {...props}
      />
    );
  };
