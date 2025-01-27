import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Dimensions} from 'react-native';
import {ChefHat, NotebookPen, House, Settings} from 'lucide-react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

import {navigate} from 'app/navigationRef';
import Text from '../text';

const menuItems = ['Home', 'Recipes', 'Notes', 'Profile'];
const icons = [House, ChefHat, NotebookPen, Settings];

const routes: {
  [key: string]: string[];
} = {
  Home: ['Home', 'RecipeDetails', 'News', 'NewsDetails'],
  Recipes: ['Recipes', 'Success', 'NewRecipe', 'Dishes'],
  Notes: ['Notes', 'NewNote', 'NoteDetails'],
  Profile: ['Profile', 'Personal', 'Notifications'],
};

const {width} = Dimensions.get('window');

const Menu = () => {
  const insets = useSafeAreaInsets();
  const [activeRoute, setActiveRoute] = useState(menuItems[0]);

  return (
    <View style={styles.overlay}>
      <View style={[styles.container, {paddingBottom: insets.bottom + 5}]}>
        {menuItems.map((item, index) => {
          const Icon = icons[index];
          const isActive = routes[activeRoute].includes(item);
          return (
            <TouchableOpacity
              key={index}
              onPress={() => {
                navigate(item);
                setActiveRoute(item);
              }}
              style={[styles.item, isActive ? styles.active : null]}>
              {Icon && (
                <Icon size={24} color={isActive ? '#EBEBEB' : '#7E7E7E'} />
              )}
              <Text
                fontSize={14}
                fontWeight="500"
                color={isActive ? '#EBEBEB' : '#7E7E7E'}
                mt={3}>
                {item}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  overlay: {
    backgroundColor: '#171717',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    backgroundColor: '#2B2B2BB2',
    height: width <= 375 ? 60 : 110,
    paddingHorizontal: 16,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  item: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  active: {},
});

export default Menu;
