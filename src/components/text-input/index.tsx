import React from 'react';
import {
  View,
  TextInput as RNTextInput,
  StyleSheet,
  TextInputProps,
} from 'react-native';

import Text from '../text';

interface IProps extends TextInputProps {
  notes?: string;
  label?: string;
  required?: boolean;
}

const TextInput: React.FC<IProps> = props => {
  return (
    <View style={styles.container}>
      <RNTextInput
        {...props}
        style={[
          styles.textInput,
          props.notes ? styles.withNotes : null,
          props.label && !props.multiline ? styles.label : null,
          props.multiline ? styles.multiline : null,
          props.style,
        ]}
        textAlign={props.multiline ? 'left' : 'right'}
        placeholder={props.placeholder || 'Value'}
        placeholderTextColor={props.multiline ? '#8D8D8D' : '#454545'}
      />

      {props.label && (
        <Text
          fontSize={14}
          style={styles.labelText}
          fontWeight="500"
          color="#CBC9C9">
          {props.label}
        </Text>
      )}

      {props.notes && (
        <Text
          fontSize={12}
          style={styles.notes}
          color="#B3B3B3"
          fontWeight="400">
          {props.notes}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  textInput: {
    borderRadius: 8,
    fontFamily: 'DMSans-Medium',
    fontSize: 14,
    color: '#fff',
    fontWeight: '400',
    paddingVertical: 14,
    paddingHorizontal: 15,
    backgroundColor: '#2E2E2E',
  },
  labelText: {
    position: 'absolute',
    left: 15,
    top: 13,
    zIndex: 1,
  },
  multiline: {
    height: 120,
    borderWidth: 1,
    borderColor: '#212121',
    backgroundColor: 'transparent',
  },
  notes: {
    marginBottom: 20,
  },
  label: {
    paddingLeft: 120,
  },
  withNotes: {
    marginBottom: 6,
  },
});

export default TextInput;
