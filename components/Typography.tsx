import { Text, TextProps } from 'react-native-paper';
import React from 'react';
import { Text as NativeText } from 'react-native';

interface Props extends TextProps<NativeText> {
  fontFamily?: 'RobotoRegular' | 'RobotoMedium' | 'SpaceMono';
}

const Typography = ({ fontFamily = 'RobotoMedium', ...rest }: Props) => {
  return (
    <Text {...rest} style={[rest.style, { fontFamily }]}>
      {rest.children}
    </Text>
  );
};

export default Typography;
