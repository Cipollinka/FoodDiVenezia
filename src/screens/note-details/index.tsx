import React, {useState} from 'react';
import {StyleSheet, FlatList, TouchableOpacity, View} from 'react-native';
import {Trash2} from 'lucide-react-native';
import FastImage from 'react-native-fast-image';

import Text from 'app/components/text';
import {goBack} from 'app/navigationRef';
import {Note} from 'app/store/coreReducer';
import SafeView from 'app/components/safe-view';
import NoteCard from 'app/components/note-card';
import {useAppDispatch} from 'app/store/hooks';
import {removeNote} from 'app/store/coreReducer';
import ModalWrapper from 'app/components/modal-wrapper';

interface IProps {
  route?: {
    params?: {
      item: Note;
    };
  };
}

const NoteDetails: React.FC<IProps> = ({route}) => {
  const dispatch = useAppDispatch();
  const noteDetails = route?.params?.item;
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!noteDetails) {
    return null;
  }

  return (
    <SafeView
      showBackButton
      rightButton={
        noteDetails.id ? (
          <TouchableOpacity onPress={() => setIsModalOpen(true)}>
            <Trash2 size={20} color="#fff" />
          </TouchableOpacity>
        ) : null
      }
      title="Notes">
      <View>
        <NoteCard item={noteDetails} />

        <FlatList
          style={styles.list}
          horizontal
          showsHorizontalScrollIndicator={false}
          data={noteDetails.images}
          renderItem={({item}) => {
            return (
              <FastImage
                source={{uri: `data:image/png;base64,${item}`}}
                style={styles.image}
              />
            );
          }}
        />

        <View style={styles.text}>
          <Text fontSize={14} fontWeight="400">
            {noteDetails.description}
          </Text>
        </View>
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
              dispatch(removeNote(noteDetails.id));
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
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 30,
    width: '100%',
  },
  list: {
    marginTop: 5,
  },
  text: {
    padding: 15,
    minHeight: 200,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#212121',
    marginTop: 15,
  },
  image: {
    width: 140,
    height: 120,
    borderRadius: 15,
    backgroundColor: '#fff',
    marginRight: 10,
  },
});

export default NoteDetails;
