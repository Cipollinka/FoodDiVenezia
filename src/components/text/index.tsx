import React, {PropsWithChildren} from 'react';
import {Text as RNText, StyleSheet} from 'react-native';

interface TextProps {
  fontSize?: number;
  mt?: number;
  mb?: number;
  px?: number;
  fontWeight?: '400' | '500' | '600';
  style?: any;
  ta?: string;
  color?: string;
  numberOfLines?: number;
}

const fontWeightMap: {
  [key: string]: string;
} = {
  600: 'DMSans-SemiBold',
  500: 'DMSans-Medium',
  400: 'DMSans-Regular',
};

const Text: React.FC<PropsWithChildren<TextProps>> = ({
  children,
  fontSize = 16,
  mt,
  mb,
  px,
  fontWeight = '400',
  style,
  numberOfLines,
  color = '#fff',
  ta = 'left',
}) => {
  return (
    <RNText
      selectable
      style={[
        styles.text,
        {
          fontSize,
          fontWeight,
          color,
          textAlign: ta,
          marginTop: mt,
          marginBottom: mb,
          paddingHorizontal: px,
          numberOfLines,
          fontFamily: fontWeightMap[fontWeight],
        },
        style,
      ]}>
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  text: {
    color: '#000', // Default text color, can be overridden by props
  },
});

export default Text;
