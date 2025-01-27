import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';

import Text from '../text';

interface IProps {
  value?: string;
  label?: string;
  onChange: (value: string) => void;
  options: {
    label: string;
    value: string;
  }[];
}

const DropdownPicker: React.FC<IProps> = ({
  value,
  label,
  options,
  onChange,
}) => {
  return (
    <View>
      {label && (
        <Text fontSize={14} mb={8} fontWeight="500" color="#1E1E1E">
          {label}
        </Text>
      )}
      <Dropdown
        style={styles.root}
        data={options}
        maxHeight={300}
        labelField="label"
        valueField="value"
        value={value}
        placeholder="Select"
        placeholderStyle={styles.placeholderStyle}
        onChange={item => {
          onChange(item.value);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#B3B3B3',
    paddingVertical: 10,
    paddingHorizontal: 16,
    backgroundColor: '#fff',
  },
  placeholderStyle: {
    color: '#B3B3B3',
  },
});

export default DropdownPicker;
