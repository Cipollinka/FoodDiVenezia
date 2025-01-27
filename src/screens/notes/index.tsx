import React from 'react';
import {StyleSheet, FlatList, TouchableOpacity, View} from 'react-native';
import {CirclePlus, X} from 'lucide-react-native';

import Text from 'app/components/text';
import NoteCard from 'app/components/note-card';
import SafeView from 'app/components/safe-view';
import {useAppSelector} from 'app/store/hooks';
import {navigate} from 'app/navigationRef';

const Notes: React.FC = () => {
  const {notes = []} = useAppSelector(state => state.core);

  return (
    <SafeView title="Notes">
      <View style={styles.content}>
        {notes.length > 0 ? (
          <FlatList
            data={notes}
            style={styles.list}
            renderItem={({item}) => (
              <NoteCard
                item={item}
                onPress={() => navigate('NoteDetails', {item})}
              />
            )}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.empty}>
            <X size={40} color="#837552" />
            <Text color="#B0B0B0">you don`t have any notes </Text>
          </View>
        )}

        <TouchableOpacity onPress={() => navigate('NewNote')}>
          <CirclePlus size={60} fill="#2EC26B" color="#171717" />
        </TouchableOpacity>
      </View>
    </SafeView>
  );
};

const styles = StyleSheet.create({
  list: {
    width: '100%',
  },
  content: {
    alignItems: 'center',
    height: '100%',
    justifyContent: 'space-between',
    paddingBottom: 16,
  },
  empty: {
    alignItems: 'center',
    gap: 8,
  },
});

export default Notes;
