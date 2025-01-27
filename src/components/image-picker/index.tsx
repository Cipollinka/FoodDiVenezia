import React from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {launchImageLibrary, launchCamera} from 'react-native-image-picker';
import {Upload, Camera, X} from 'lucide-react-native';

import Text from '../text';
import FastImage from 'react-native-fast-image';

interface IProps {
  image?: string;
  type?: 'multiple' | 'single';
  changeImage?: (image: string) => void;
}

const ImagePicker: React.FC<IProps> = ({type, image, changeImage}) => {
  const takePhoto = async () => {
    const result = await launchCamera({
      cameraType: 'back',
      mediaType: 'photo',
      includeBase64: true,
      quality: 0.5,
    });

    if (result.assets && result.assets.length > 0 && result.assets[0].base64) {
      changeImage && changeImage(result.assets[0].base64);
    }
  };

  const selectPhoto = async () => {
    const result = await launchImageLibrary({
      mediaType: 'photo',
      includeBase64: true,
      quality: 0.5,
    });

    if (result.assets && result.assets.length > 0 && result.assets[0].base64) {
      changeImage && changeImage(result.assets[0].base64);
    }
  };

  return (
    <View style={styles.container}>
      {image ? (
        <FastImage
          source={{uri: `data:image/png;base64,${image}`}}
          style={styles.image}>
          <TouchableOpacity
            style={styles.ais}
            onPress={() => changeImage && changeImage('')}>
            <X color="#fff" size={26} />
          </TouchableOpacity>
        </FastImage>
      ) : (
        <View style={styles.options}>
          <TouchableOpacity style={styles.button} onPress={selectPhoto}>
            <Upload color="#B1B1B1" size={20} />
            <Text fontSize={12} color="#B1B1B1">
              Upload photo
            </Text>
          </TouchableOpacity>

          {type === 'multiple' && (
            <TouchableOpacity style={styles.button} onPress={takePhoto}>
              <Camera color="#B1B1B1" size={20} />
              <Text fontSize={12} color="#B1B1B1">
                Take a snapshot
              </Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 100,
    borderRadius: 25,
  },
  options: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: 10,
  },
  ais: {
    alignSelf: 'flex-end',
    padding: 6,
  },
  button: {
    flex: 1,
    gap: 10,
    marginBottom: 10,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D5D5D4',
    padding: 14,
    borderRadius: 14,
    borderStyle: 'dashed',
    backgroundColor: '#F7F7F7',
  },
});

export default ImagePicker;
