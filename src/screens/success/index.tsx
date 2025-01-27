import React from 'react';
import {StyleSheet, View} from 'react-native';
import {ChefHat} from 'lucide-react-native';

import SafeView from 'app/components/safe-view';
import Text from 'app/components/text';
import Button from 'app/components/button';
import {navigate} from 'app/navigationRef';

const SuccessScreen = () => {
  return (
    <SafeView>
      <View style={styles.content}>
        <ChefHat fill="#fff" color="#171717" size={100} />

        <Text fontSize={32} fontWeight="500" mt={45} mb={13}>
          Done!
        </Text>

        <Button title="Go to main page" onPress={() => navigate('Home')} />
      </View>
    </SafeView>
  );
};

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
  },
});

export default SuccessScreen;
