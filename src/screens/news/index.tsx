import React from 'react';
import {StyleSheet, FlatList, View, TouchableOpacity} from 'react-native';

import Text from 'app/components/text';
import {navigate} from 'app/navigationRef';
import {news} from 'app/assets/news.json';
import SafeView from 'app/components/safe-view';

const NewsScreen: React.FC = () => {
  return (
    <SafeView title="News" showBackButton>
      <FlatList
        numColumns={2}
        columnWrapperStyle={styles.list}
        data={news}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.item}
            onPress={() => navigate('NewsDetails', {item})}>
            <View style={styles.image} />
            <Text fontSize={14} fontWeight="500" numberOfLines={1}>
              {item.name}
            </Text>
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
      />
    </SafeView>
  );
};

const styles = StyleSheet.create({
  list: {
    gap: 20,
  },
  image: {
    height: 100,
    backgroundColor: '#fff',
    borderRadius: 15,
    marginBottom: 8,
  },
  item: {
    flex: 1,
    paddingBlock: 10,
  },
});

export default NewsScreen;
