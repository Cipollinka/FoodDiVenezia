import React, {ReactNode} from 'react';
import {
  TouchableOpacity,
  View,
  ViewStyle,
  StyleSheet,
  StyleProp,
} from 'react-native';

import Text from '../text';

interface ButtonProps {
  title: string;
  bg?: string;
  px?: number;
  py?: number;
  x2?: boolean;
  small?: boolean;
  disabled?: boolean;
  onPress: () => void;
  icon?: ReactNode;
  style?: StyleProp<ViewStyle>;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  style,
  small,
  icon,
  x2 = false,
  bg = '#837552',
  disabled,
  px = 12,
  py = 8,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={[
        styles.buttonContainer,
        style,
        x2 ? styles.x2 : null,
        small ? styles.small : null,
        disabled ? styles.disabled : null,
        {backgroundColor: bg},
        {
          paddingHorizontal: x2 ? px * 2 : px,
          paddingVertical: x2 ? py * 2 : py,
        },
      ]}>
      {icon && <View style={styles.icon}>{icon}</View>}
      <Text
        style={[
          styles.buttonText,
          small ? styles.smallText : null,
          x2 ? styles.x2Text : null,
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    borderRadius: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#227EF6',
  },
  x2: {
    borderRadius: 20,
  },
  icon: {
    marginRight: 6,
  },
  disabled: {
    opacity: 0.5,
  },
  small: {
    height: 40,
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  smallText: {
    fontSize: 16,
    fontWeight: '500',
  },
  x2Text: {
    fontSize: 16,
    fontWeight: '600',
  },
});

export default Button;
