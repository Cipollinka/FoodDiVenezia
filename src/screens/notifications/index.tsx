import React, {useState, useCallback} from 'react';
import {StyleSheet, View, TouchableOpacity} from 'react-native';
import {useFocusEffect} from '@react-navigation/native';
import {BellRing, Circle} from 'lucide-react-native';

import Text from 'app/components/text';
import SafeView from 'app/components/safe-view';
import {setUserInfo} from 'app/store/coreReducer';
import {useAppSelector, useAppDispatch} from 'app/store/hooks';

const NotificationsScreen: React.FC = () => {
  const dispatch = useAppDispatch();
  const {userInfo} = useAppSelector(state => state.core);

  const [showNotifications, setShowNotifications] = useState(false);

  useFocusEffect(
    useCallback(() => {
      setShowNotifications(userInfo?.notifications || false);
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  useFocusEffect(
    useCallback(() => {
      return () => {
        dispatch(setUserInfo({notifications: showNotifications}));
      };
    }, [dispatch, showNotifications]),
  );

  return (
    <SafeView title="Notifications" showBackButton>
      <View style={styles.content}>
        <View style={styles.center}>
          <BellRing size={60} color="#fff" />
        </View>
        <TouchableOpacity
          onPress={() => setShowNotifications(!showNotifications)}
          style={styles.button}>
          <Text fontWeight="500" fontSize={14}>
            {showNotifications ? 'Off' : 'On'}
          </Text>
          <Circle
            size={24}
            color={showNotifications ? '#DAB557' : '#fff'}
            fill={showNotifications ? '#DAB557' : '#fff'}
          />
        </TouchableOpacity>
      </View>
    </SafeView>
  );
};

const styles = StyleSheet.create({
  content: {
    gap: 42,
  },
  center: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#212121',
    padding: 16,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export default NotificationsScreen;
