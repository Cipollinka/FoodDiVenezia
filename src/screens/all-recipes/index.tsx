import React from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {CupSoda, IceCreamBowl, Salad, Ham, Soup} from 'lucide-react-native';
import FastImage from 'react-native-fast-image';

import Text from 'app/components/text';
import Button from 'app/components/button';
import {navigate} from 'app/navigationRef';
import SafeView from 'app/components/safe-view';
import {recipes} from 'app/assets/recipes.json';

const icons: Record<string, React.ReactElement> = {
  main: <CupSoda color="#837552" size={46} />,
  salad: <Salad color="#837552" size={46} />,
  dessert: <IceCreamBowl color="#837552" size={46} />,
  drink: <Soup color="#837552" size={46} />,
  meat: <Ham color="#837552" size={46} />,
};

const AllRecipes: React.FC = () => {
  const renderItem = ({item}: {item: (typeof recipes)[0]}) => {
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity
          key={item.name}
          style={styles.item}
          onPress={() => navigate('RecipeDetails', {item})}>
          {icons[item.category]}
        </TouchableOpacity>
        <Text fontSize={14} fontWeight="500" mt={5} numberOfLines={2}>
          {item.name?.slice(0, 20)}
          {item.name.length > 20 ? '...' : ''}
        </Text>
      </View>
    );
  };

  return (
    <SafeView title="Recipes">
      <View>
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

        <View style={[styles.block, styles.block2]}>
          <View style={styles.header}>
            <View style={styles.info}>
              <View>
                <Text fontSize={18} fontWeight="500">
                  Best dishes
                </Text>
                <Text fontSize={14}>from Venice</Text>
              </View>
            </View>
            <FastImage
              source={require('app/assets/images/house.png')}
              style={styles.image2}
              resizeMode="contain"
            />
          </View>

          <FlatList
            showsHorizontalScrollIndicator={false}
            data={recipes.slice(0, 5)}
            horizontal
            style={styles.list}
            renderItem={renderItem}
          />
          <View style={styles.action}>
            <Button title="More dishes" onPress={() => navigate('Dishes')} />
          </View>
        </View>
      </View>
    </SafeView>
  );
};

const styles = StyleSheet.create({
  block: {
    borderRadius: 15,
    backgroundColor: '#212121',
    flexDirection: 'row',
    alignItems: 'flex-end',
    overflow: 'hidden',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  item: {
    width: 100,
    height: 100,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
  },
  block2: {
    alignItems: 'flex-start',
    flexDirection: 'column',
    paddingBottom: 10,
    marginBottom: 0,
  },
  info: {
    gap: 25,
    width: '60%',
    padding: 15,
    alignItems: 'flex-start',
  },
  list: {
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  image: {
    width: 150,
    height: 100,
  },
  image2: {
    width: 150,
    height: 75,
  },
  action: {
    width: '100%',
    paddingHorizontal: 15,
  },
  itemContainer: {
    width: 100,
    marginRight: 10,
  },
});

export default AllRecipes;
