import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import FastImage from 'react-native-fast-image';

import Text from '../text';
import {Recipe} from 'app/store/coreReducer';
import {navigate} from 'app/navigationRef';

interface CardProps {
  item: Recipe;
}

const Card: React.FC<CardProps> = ({item}) => {
  return (
    <TouchableOpacity
      style={styles.root}
      onPress={() => navigate('RecipeDetails', {item})}>
      {item.image ? (
        <FastImage
          source={{uri: `data:image/png;base64,${item?.image}`}}
          style={styles.image}
        />
      ) : (
        <View style={styles.image} />
      )}
      <Text fontSize={14} fontWeight="500" numberOfLines={1}>
        {item.title}
      </Text>

      <View style={styles.row}>
        <View style={[styles.dot, {backgroundColor: item.color}]} />
        <Text fontSize={12} fontWeight="400">
          {item.preparation_time} min
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 100,
    backgroundColor: '#fff',
    borderRadius: 15,
  },
  root: {
    flex: 1,
    gap: 5,
    maxWidth: '47%',
    marginBottom: 20,
  },
  row: {
    gap: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  dot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: '#000',
  },
});

export default Card;
