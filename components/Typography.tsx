import { Text, TextProps, useTheme } from 'react-native-paper';
import React from 'react';
import { ColorValue, Text as NativeText } from 'react-native';
import { MD3Colors } from 'react-native-paper/lib/typescript/types';

interface Props extends TextProps<NativeText> {
  fontFamily?: 'RobotoRegular' | 'RobotoMedium' | 'SpaceMono';
  textColor?: keyof MD3Colors;
}

const Typography = ({
  fontFamily = 'RobotoMedium',
  textColor = 'onSurface',
  ...rest
}: Props) => {
  const { colors } = useTheme();
  return (
    <Text
      {...rest}
      style={[
        rest.style,
        { fontFamily, color: colors[textColor] as ColorValue },
      ]}>
      {rest.children}
    </Text>
  );
};

export default Typography;
