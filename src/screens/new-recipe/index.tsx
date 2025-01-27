import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {nanoid} from '@reduxjs/toolkit';

import {navigate} from 'app/navigationRef';
import Text from 'app/components/text';
import Button from 'app/components/button';
import TextInput from 'app/components/text-input';
import SafeView from 'app/components/safe-view';
import {useAppDispatch} from 'app/store/hooks';
import {Recipe, addRecipe} from 'app/store/coreReducer';
import ImagePicker from 'app/components/image-picker';

const colors = ['#2EC26B', '#F68F2F', '#EE2B42'];

const NewRecipe = () => {
  const dispatch = useAppDispatch();

  const [recipe, changePlace] = React.useState<Recipe>({
    title: '',
    color: colors[0],
    description: '',
    preparation_time: '',
    image: '',
  });

  const addRecipeToStore = () => {
    dispatch(
      addRecipe({
        recipe_id: nanoid(),
        ...recipe,
      }),
    );
    navigate('Success');
  };

  const isDisabled = Object.values(recipe).some(value => !value);

  return (
    <SafeView title="Create recipe" showBackButton>
      <View style={styles.root}>
        <View>
          <View style={styles.form}>
            <TextInput
              label="Recipe name"
              placeholder="required"
              value={recipe.title}
              maxLength={30}
              onChangeText={value => changePlace({...recipe, title: value})}
            />

            <TextInput
              label="Cooking time"
              keyboardType="number-pad"
              value={recipe.preparation_time}
              placeholder="min"
              onChangeText={value =>
                changePlace({...recipe, preparation_time: value})
              }
            />

            <View style={[styles.picker, styles.row]}>
              <Text fontSize={14} fontWeight="500" color="#CBC9C9">
                Difficulty level
              </Text>

              <View style={[styles.row, styles.list]}>
                {colors.map(color => (
                  <TouchableOpacity
                    key={color}
                    onPress={() => changePlace({...recipe, color: color})}
                    style={[
                      styles.color,
                      recipe.color === color ? styles.active : null,
                      {backgroundColor: color},
                    ]}
                  />
                ))}
              </View>
            </View>

            <ImagePicker
              image={recipe.image}
              type="single"
              changeImage={image => changePlace({...recipe, image: image})}
            />
          </View>

          <TextInput
            placeholder="Step-by-step instructions"
            value={recipe.description}
            multiline
            onChangeText={value => changePlace({...recipe, description: value})}
          />
        </View>

        <View style={styles.actionContainer}>
          <Button
            x2
            title="Done"
            disabled={isDisabled}
            onPress={addRecipeToStore}
          />
        </View>
      </View>
    </SafeView>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'space-between',
  },
  list: {
    gap: 30,
  },
  color: {
    width: 30,
    height: 20,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  active: {
    borderColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  form: {
    borderRadius: 15,
    padding: 10,
    gap: 15,
    backgroundColor: '#212121',
    marginBottom: 20,
  },
  actionContainer: {
    marginVertical: 20,
  },
  picker: {
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 15,
    backgroundColor: '#2E2E2E',
    justifyContent: 'space-between',
  },
});

export default NewRecipe;
