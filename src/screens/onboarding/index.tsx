import React, {useState, useCallback} from 'react';
import {StyleSheet, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {useFocusEffect} from '@react-navigation/native';

import Text from 'app/components/text';
import Button from 'app/components/button';
import {navigate} from 'app/navigationRef';
import {useAppDispatch} from 'app/store/hooks';
import SafeView from 'app/components/safe-view';
import {setCurrentRouteName, setHideWelcomeScreen} from 'app/store/coreReducer';

const Onboarding: React.FC = () => {
  const dispatch = useAppDispatch();
  const [activeStep, setActiveStep] = useState(0);

  useFocusEffect(
    useCallback(() => {
      dispatch(setCurrentRouteName('Onboarding'));
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  return (
    <SafeView>
      <View style={styles.content}>
        <View style={styles.block}>
          <FastImage
            source={
              !activeStep
                ? require('app/assets/images/1.png')
                : require('app/assets/images/2.png')
            }
            style={styles.image}
          />
        </View>
        <Text fontSize={40} fontWeight="600" mt={30} mb={10} ta="center">
          {!activeStep ? 'Cook' : 'Notes'}
        </Text>
        <Text ta="center">
          {!activeStep
            ? 'Use the best recipes from Venice and create your own to review and repeat'
            : 'Write your notes. Label them with your thoughts, assign categories and colors '}
        </Text>

        <View style={styles.pagination}>
          <View
            style={[styles.paginationBlock, !activeStep ? styles.active : null]}
          />
          <View
            style={[styles.paginationBlock, activeStep ? styles.active : null]}
          />
        </View>

        <Button
          title="Next"
          x2
          onPress={() => {
            if (activeStep) {
              dispatch(setHideWelcomeScreen(true));
              navigate('Home');
            } else {
              setActiveStep(1);
            }
          }}
        />
      </View>
    </SafeView>
  );
};

const styles = StyleSheet.create({
  pagination: {
    marginVertical: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 7,
  },
  content: {
    paddingHorizontal: 20,
  },
  footer: {
    gap: 10,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  footerText: {
    textDecorationLine: 'underline',
    textDecorationColor: '#435CFF',
  },
  block: {
    height: 300,
    borderRadius: 15,
    overflow: 'hidden',
    backgroundColor: 'rgba(237, 174, 17, 0.20) 100%)',
  },
  paginationBlock: {
    width: 5,
    height: 20,
    borderRadius: 5,
    backgroundColor: '#4D4D4D',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  active: {
    height: 30,
    backgroundColor: '#fff',
  },
});

export default Onboarding;
