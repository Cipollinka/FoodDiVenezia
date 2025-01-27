import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';

import Text from '../text';
import {Note} from 'app/store/coreReducer';

interface IProps {
  item: Note;
  onPress?: () => void;
}

const NoteCard: React.FC<IProps> = ({item, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.item, {backgroundColor: item.color}]}>
      <Text fontSize={14} fontWeight="500" numberOfLines={1} color="#000">
        {item.name}
      </Text>
      <View style={styles.category}>
        <Text fontSize={14} fontWeight="500" color="#CBC9C9">
          {item.category}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 15,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  category: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: '#212121',
    alignSelf: 'flex-start',
  },
});

export default NoteCard;
