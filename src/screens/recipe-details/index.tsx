import React, {useState} from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {
  CupSoda,
  IceCreamBowl,
  Salad,
  Ham,
  Soup,
  Trash2,
} from 'lucide-react-native';
import FastImage from 'react-native-fast-image';

import Text from 'app/components/text';
import {goBack} from 'app/navigationRef';
import {Recipe} from 'app/store/coreReducer';
import SafeView from 'app/components/safe-view';
import {useAppDispatch} from 'app/store/hooks';
import {removeRecipe} from 'app/store/coreReducer';
import ModalWrapper from 'app/components/modal-wrapper';

interface IProps {
  route?: {
    params?: {
      item: Recipe;
    };
  };
}

const icons: Record<string, React.ReactElement> = {
  main: <CupSoda color="#837552" size={46} />,
  salad: <Salad color="#837552" size={46} />,
  dessert: <IceCreamBowl color="#837552" size={46} />,
  drink: <Soup color="#837552" size={46} />,
  meat: <Ham color="#837552" size={46} />,
};

const PlaceDetails: React.FC<IProps> = ({route}) => {
  const dispatch = useAppDispatch();
  const recipe = route?.params?.item;
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!recipe) {
    return null;
  }

  return (
    <SafeView
      showBackButton
      rightButton={
        recipe.recipe_id ? (
          <TouchableOpacity onPress={() => setIsModalOpen(true)}>
            <Trash2 size={20} color="#fff" />
          </TouchableOpacity>
        ) : null
      }
      title={recipe.recipe_id ? 'Your recipe' : 'Dish details'}>
      <View style={styles.header}>
        {recipe.image ? (
          <FastImage
            source={{uri: `data:image/png;base64,${recipe.image}`}}
            style={styles.image}
          />
        ) : recipe.category ? (
          icons[recipe.category]
        ) : null}
      </View>
      <View style={[styles.row, styles.block]}>
        <Text fontSize={20} fontWeight="600">
          {recipe.title || recipe.name}
        </Text>
        {recipe.color && (
          <View style={styles.row}>
            <View style={[styles.dot, {backgroundColor: recipe.color}]} />
            <Text fontSize={12} fontWeight="400">
              {recipe.preparation_time} min
            </Text>
          </View>
        )}
      </View>

      <Text color="#8D8D8D" mb={8}>
        Step-by-step instructions
      </Text>

      <View style={styles.text}>
        <Text fontSize={14} fontWeight="400">
          {recipe.description}
        </Text>
      </View>

      <ModalWrapper isOpen={isModalOpen} title="Delete?">
        <View style={styles.actions}>
          <TouchableOpacity onPress={() => setIsModalOpen(false)}>
            <Text fontWeight="500" fontSize={20} color="#EE2B42">
              No
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => {
              setIsModalOpen(false);
              dispatch(removeRecipe(recipe.recipe_id));
              goBack();
            }}>
            <Text fontWeight="500" fontSize={20} color="#2EC26B">
              Yes
            </Text>
          </TouchableOpacity>
        </View>
      </ModalWrapper>
    </SafeView>
  );
};

const styles = StyleSheet.create({
  row: {
    gap: 4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    padding: 15,
    minHeight: 200,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#212121',
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
    width: '100%',
  },
  block: {
    gap: 10,
    marginBottom: 30,
  },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#000',
  },
  header: {
    borderRadius: 15,
    backgroundColor: '#fff',
    height: 120,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

export default PlaceDetails;
