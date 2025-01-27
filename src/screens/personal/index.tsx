import React, {useState, useCallback} from 'react';
import {StyleSheet, View} from 'react-native';

import SafeView from 'app/components/safe-view';
import {setUserInfo} from 'app/store/coreReducer';
import {useAppSelector, useAppDispatch} from 'app/store/hooks';
import TextInput from 'app/components/text-input';
import {useFocusEffect} from '@react-navigation/native';

const PersonalScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const {userInfo} = useAppSelector(state => state.core);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  useFocusEffect(
    useCallback(() => {
      setName(userInfo?.name || '');
      setEmail(userInfo?.email || '');
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      return () => {
        dispatch(setUserInfo({name, email}));
      };
    }, [dispatch, name, email]),
  );

  return (
    <SafeView title="Personal" showBackButton>
      <View style={styles.content}>
        <TextInput
          label="Your name"
          placeholder="required"
          value={name}
          onChangeText={setName}
        />

        <TextInput
          label="Your email"
          placeholder="required"
          value={email}
          onChangeText={setEmail}
        />
      </View>
    </SafeView>
  );
};

const styles = StyleSheet.create({
  content: {
    gap: 15,
    borderRadius: 15,
    padding: 10,
    backgroundColor: '#212121',
  },
});

export default PersonalScreen;
