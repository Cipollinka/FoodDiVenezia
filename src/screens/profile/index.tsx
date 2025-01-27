import React from 'react';
import {StyleSheet, View, TouchableOpacity, Alert, Linking} from 'react-native';
import {ChefHat, ChevronRight} from 'lucide-react-native';

import Text from 'app/components/text';
import SafeView from 'app/components/safe-view';
import {reset} from 'app/store/coreReducer';
import {useAppSelector, useAppDispatch} from 'app/store/hooks';
import {navigate, reset as resetNavigation} from 'app/navigationRef';

const ProfileScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const {userInfo} = useAppSelector(state => state.core);

  const showConfirmationAlert = () => {
    Alert.alert(
      'Remove account?',
      'Are you sure you want to delete your account?',
      [
        {
          text: 'Yes',
          onPress: () => {
            dispatch(reset());
            setTimeout(() => {
              resetNavigation([{name: 'Onboarding'}]);
            }, 700);
          },
        },
        {
          text: 'No',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
      ],
    );
  };

  const openPolicy = () => {Linking.openURL('https://www.termsfeed.com/live/2c8c85e4-720e-4558-a816-bfbe676cc220')};

  const renderButton = (title: string, onPress?: () => void) => {
    return (
      <TouchableOpacity onPress={onPress} style={styles.button}>
        <Text fontWeight="500" fontSize={14}>
          {title}
        </Text>
        <ChevronRight color="#fff" size={18} />
      </TouchableOpacity>
    );
  };

  return (
    <SafeView title="Settings">
      <View style={styles.content}>
        <View style={styles.header}>
          <View style={styles.avatar}>
            <ChefHat color="#fff" size={30} fill="#000" />
          </View>

          <View>
            <Text fontSize={14} color="#949494">
              {userInfo?.name || 'empty'}
            </Text>
            <Text fontSize={18} fontWeight="600">
              {userInfo?.name || 'empty'}
            </Text>
          </View>
        </View>
        <View style={styles.block}>
          <Text fontWeight="500" fontSize={28}>
            Account
          </Text>

          {renderButton('Personal information', () => navigate('Personal'))}
          {renderButton('Notification settings', () =>
            navigate('Notifications'),
          )}
        </View>

        <View style={styles.block}>
          <Text fontWeight="500" fontSize={28}>
            Danger
          </Text>

          {renderButton('Delete account', showConfirmationAlert)}
        </View>

        <View style={styles.block}>
          <Text fontWeight="500" fontSize={28}>
            General
          </Text>

          {renderButton('Terms of use', openPolicy)}
          {renderButton('Developer website', openPolicy)}
          {renderButton('Privacy policy', openPolicy)}
        </View>
      </View>
    </SafeView>
  );
};

const styles = StyleSheet.create({
  block: {
    gap: 15,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    backgroundColor: '#212121',
    padding: 16,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    gap: 30,
  },
  header: {
    marginLeft: -16,
    marginRight: -16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    padding: 16,
    backgroundColor: '#212121',
  },
});

export default ProfileScreen;
