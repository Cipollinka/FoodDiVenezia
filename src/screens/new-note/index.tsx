import React, {useState} from 'react';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import Text from 'app/components/text';
import {nanoid} from '@reduxjs/toolkit';
import FastImage from 'react-native-fast-image';
import {X} from 'lucide-react-native';
import ColorPicker, {
  Panel1,
  OpacitySlider,
  Panel5,
  RedSlider,
  GreenSlider,
  BlueSlider,
} from 'reanimated-color-picker';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';
import {RNTabBar, RNTabBarOption} from 'react-native-ios-tab-bar';

import {goBack} from 'app/navigationRef';
import Button from 'app/components/button';
import TextInput from 'app/components/text-input';
import SafeView from 'app/components/safe-view';
import {useAppDispatch} from 'app/store/hooks';
import {Note, addNote} from 'app/store/coreReducer';
import ModalWrapper from 'app/components/modal-wrapper';
import ImagePicker from 'app/components/image-picker';

const {width} = Dimensions.get('window');

const NewNote: React.FC = () => {
  const dispatch = useAppDispatch();
  const [activeIndex, setActiveIndex] = useState(0);
  const [colors, setColors] = useState<string[]>([
    '#5AFDDA',
    '#5C5AFD',
    '#F55AFD',
  ]);
  const [category, setCategory] = useState('');
  const [tempColor, setTempColor] = useState('');
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  const [noteData, changeNote] = useState<Note>({
    name: '',
    category: '',
    color: '',
    description: '',
    images: [],
  });

  const addNoteToStore = () => {
    dispatch(
      addNote({
        id: nanoid(),
        ...noteData,
      }),
    );
    goBack();
  };

  const removeImage = (index: number) => {
    changeNote({
      ...noteData,
      images: noteData.images.filter((_, i) => i !== index),
    });
  };

  const isDisabled = Object.values(noteData).some(value => !value);

  return (
    <>
      <SafeView title="Notes" showBackButton>
        <View style={styles.root}>
          <View>
            <View style={styles.form}>
              <TextInput
                label="Note name"
                placeholder="required"
                value={noteData.name}
                maxLength={30}
                onChangeText={value => changeNote({...noteData, name: value})}
              />

              <ImagePicker
                type="multiple"
                changeImage={image =>
                  changeNote({...noteData, images: [...noteData.images, image]})
                }
              />

              {noteData.images.length > 0 && (
                <FlatList
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  data={noteData.images}
                  renderItem={({item, index}) => {
                    return (
                      <FastImage
                        source={{uri: `data:image/png;base64,${item}`}}
                        style={styles.image}>
                        <TouchableOpacity
                          style={styles.ais}
                          onPress={() => removeImage(index)}>
                          <X size={20} color="#fff" />
                        </TouchableOpacity>
                      </FastImage>
                    );
                  }}
                />
              )}

              <View style={styles.picker}>
                <View style={styles.row}>
                  <Text fontSize={14} fontWeight="500" color="#CBC9C9">
                    Category
                  </Text>

                  <Button
                    px={12}
                    py={6}
                    title={noteData.category ? 'Edit' : 'Add'}
                    onPress={() => setShowCategoryModal(true)}
                  />
                </View>

                {noteData.category && (
                  <View style={styles.value}>
                    <Text fontSize={14} fontWeight="500" color="#CBC9C9">
                      {noteData.category}
                    </Text>
                  </View>
                )}
              </View>

              <View style={styles.picker}>
                <View style={styles.row}>
                  <Text fontSize={14} fontWeight="500" color="#CBC9C9">
                    Color
                  </Text>

                  <Button
                    px={12}
                    py={6}
                    title="Add"
                    onPress={() => setShowColorPicker(true)}
                  />
                </View>

                {colors.length > 0 && (
                  <View style={styles.colors}>
                    {colors.map(color => {
                      return (
                        <TouchableOpacity
                          onPress={() =>
                            changeNote({...noteData, color: color})
                          }
                          style={[
                            styles.dot,
                            {backgroundColor: color},
                            noteData.color === color ? styles.dotActive : null,
                          ]}
                        />
                      );
                    })}
                  </View>
                )}
              </View>
            </View>

            <TextInput
              placeholder="Description"
              value={noteData.description}
              multiline
              onChangeText={value =>
                changeNote({...noteData, description: value})
              }
            />
          </View>

          <View style={styles.actionContainer}>
            <Button
              x2
              title="Done"
              disabled={isDisabled}
              onPress={addNoteToStore}
            />
          </View>
        </View>

        <ModalWrapper
          inset
          isOpen={showCategoryModal}
          title={`${noteData.category ? 'Edit' : 'Add'} category`}>
          <View style={styles.modalForm}>
            <TextInput
              label="Category name"
              placeholder="required"
              value={category}
              maxLength={30}
              onChangeText={setCategory}
            />
            <Button
              title="Done"
              onPress={() => {
                changeNote({...noteData, category});
                setShowCategoryModal(false);
              }}
            />
          </View>
        </ModalWrapper>
      </SafeView>
      {showColorPicker && (
        <Animated.View
          style={styles.bottomSheet}
          entering={FadeIn}
          exiting={FadeOut}>
          <Text fontSize={17} ta="center" fontWeight="600" mb={15}>
            Colors
          </Text>

          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => {
              setShowColorPicker(false);
              setColors([...colors, tempColor]);
            }}>
            <X size={20} color="#fff" />
          </TouchableOpacity>

          <ColorPicker
            value={noteData.color}
            onComplete={data => {
              setTempColor(data.rgba);
            }}>
            <RNTabBar
              width={width - 32}
              onActiveIndexChange={setActiveIndex}
              activeIndex={activeIndex}
              height={40}
              activeColor="#636366"
              backgroundColor="#0000000A">
              <RNTabBarOption>
                <Text>Grid</Text>
              </RNTabBarOption>

              <RNTabBarOption>
                <Text>Spectrum</Text>
              </RNTabBarOption>
              <RNTabBarOption>
                <Text>Sliders</Text>
              </RNTabBarOption>
            </RNTabBar>

            <View style={styles.pickerContent}>
              {activeIndex === 0 && <Panel5 />}
              {activeIndex === 1 && <Panel1 />}
              {activeIndex === 2 && (
                <View style={styles.gap}>
                  <RedSlider />
                  <GreenSlider />
                  <BlueSlider />
                </View>
              )}
            </View>
            <View style={styles.opacity}>
              <OpacitySlider />
            </View>
          </ColorPicker>
        </Animated.View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'space-between',
  },
  ais: {
    alignSelf: 'flex-end',
    padding: 6,
  },
  image: {
    width: 140,
    height: 120,
    borderRadius: 15,
    backgroundColor: '#fff',
    marginRight: 10,
  },
  value: {
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    backgroundColor: '#212121',
    marginTop: 10,
    alignSelf: 'flex-start',
  },
  colors: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    gap: 10,
    alignItems: 'center',
  },
  bottomSheet: {
    position: 'absolute',
    bottom: -20,
    left: 0,
    right: 0,
    padding: 16,
    zIndex: 100,
    backgroundColor: '#171717',
    paddingBottom: 60,
  },
  modalForm: {
    width: '100%',
    gap: 20,
    marginTop: 20,
  },
  dot: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  dotActive: {
    width: 24,
    height: 24,
    borderColor: '#fff',
  },
  closeButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#3D3D3D40',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 16,
    right: 16,
  },
  list: {
    gap: 30,
  },
  opacity: {
    marginTop: 10,
  },
  color: {
    width: 30,
    height: 20,
    borderRadius: 100,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  pickerContent: {
    marginTop: 20,
  },
  active: {
    borderColor: '#fff',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  gap: {
    gap: 20,
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

export default NewNote;
