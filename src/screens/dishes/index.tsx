import React from 'react';
import {StyleSheet, FlatList, TouchableOpacity, View} from 'react-native';
import {CupSoda, IceCreamBowl, Salad, Ham, Soup} from 'lucide-react-native';

import Text from 'app/components/text';
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

const DishesScreen = () => {
  const renderItem = ({item}: {item: (typeof recipes)[0]}) => {
    return (
      <View style={styles.itemContainer}>
        <TouchableOpacity
          key={item.name}
          style={styles.item}
          onPress={() => navigate('RecipeDetails', {item: item})}>
          {icons[item.category]}
        </TouchableOpacity>
        <Text fontSize={14} fontWeight="500" mt={5} numberOfLines={1}>
          {item.name?.slice(0, 20)}
          {item.name.length > 20 ? '...' : ''}
        </Text>
      </View>
    );
  };

  return (
    <SafeView title="Dishes" showBackButton>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={recipes}
        numColumns={2}
        style={styles.list}
        columnWrapperStyle={styles.wrapper}
        renderItem={renderItem}
      />
    </SafeView>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    minHeight: 100,
    flex: 1,
    marginBottom: 10,
    maxWidth: '48%',
  },
  wrapper: {
    gap: 10,
  },
  item: {
    flex: 1,
    height: 100,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  list: {
    marginBottom: 10,
  },
});

export default DishesScreen;
