import React from 'react';
import {StyleSheet, FlatList, View} from 'react-native';
import FastImage from 'react-native-fast-image';

import Text from 'app/components/text';
import Card from 'app/components/card';
import {navigate} from 'app/navigationRef';
import SafeView from 'app/components/safe-view';
import Button from 'app/components/button';
import {useAppSelector} from 'app/store/hooks';
import {X} from 'lucide-react-native';

const Home: React.FC = () => {
  const {recipies = []} = useAppSelector(state => state.core);

  return (
    <SafeView title="Main">
      <View style={styles.block}>
        <View style={styles.info}>
          <Text fontSize={21} fontWeight="600">
            Read the latest news
          </Text>
          <Button title="Go to" onPress={() => navigate('News')} />
        </View>
        <FastImage
          source={require('app/assets/images/news.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      <Text fontWeight="500" mb={10}>
        Your recipes
      </Text>

      {!recipies.length && (
        <View style={styles.emptyBlock}>
          <X size={20} color="#9D9D9D" />
          <Text fontWeight="500" color="#9D9D9D">
            You haven't added any recipes yet
          </Text>
        </View>
      )}

      <View style={styles.block}>
        <View style={styles.info}>
          <Text fontSize={21} fontWeight="600">
            Write down your own recipe
          </Text>
          <Button title="Create" onPress={() => navigate('NewRecipe')} />
        </View>
        <FastImage
          source={require('app/assets/images/hat.png')}
          style={styles.image}
          resizeMode="contain"
        />
      </View>

      {recipies.length > 0 && (
        <FlatList
          numColumns={2}
          columnWrapperStyle={styles.list}
          data={recipies}
          renderItem={({item}) => <Card item={item} />}
          showsVerticalScrollIndicator={false}
        />
      )}
    </SafeView>
  );
};

const styles = StyleSheet.create({
  emptyBlock: {
    gap: 3,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  list: {
    gap: 20,
  },
  image: {
    width: 150,
    height: 100,
  },
  info: {
    gap: 25,
    width: '60%',
    padding: 15,
    alignItems: 'flex-start',
  },
  block: {
    borderRadius: 15,
    backgroundColor: '#212121',
    flexDirection: 'row',
    alignItems: 'flex-end',
    overflow: 'hidden',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
});

export default Home;
