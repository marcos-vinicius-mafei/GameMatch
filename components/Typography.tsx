import { Text, TextProps } from 'react-native-paper';
import React from 'react';
import { ColorValue, Text as NativeText } from 'react-native';
import useAppTheme, { AppColors } from '../hooks/useAppTheme';

interface Props extends TextProps<NativeText> {
  fontFamily?: 'RobotoRegular' | 'RobotoMedium' | 'SpaceMono' | 'RussoOne';
  textColor?: keyof AppColors;
}

const Typography = ({
  fontFamily = 'RobotoMedium',
  textColor = 'onSurface',
  ...rest
}: Props) => {
  const { colors } = useAppTheme();
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
