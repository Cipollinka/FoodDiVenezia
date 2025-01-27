import React from 'react';
import {StyleSheet, View} from 'react-native';

import {news} from 'app/assets/news.json';
import Text from 'app/components/text';
import SafeView from 'app/components/safe-view';

interface IProps {
  route?: {
    params?: {
      item: (typeof news)[0];
    };
  };
}

const NewsDetails: React.FC<IProps> = ({route}) => {
  const newDetails = route?.params?.item;

  if (!newDetails) {
    return null;
  }

  return (
    <SafeView showBackButton title="News">
      <View style={styles.header} />
      <Text fontSize={20} fontWeight="600" mb={20}>
        {newDetails.name}
      </Text>

      <View style={styles.text}>
        <Text fontSize={14} fontWeight="400">
          {newDetails.description}
        </Text>
      </View>
    </SafeView>
  );
};

const styles = StyleSheet.create({
  header: {
    borderRadius: 15,
    backgroundColor: '#fff',
    height: 120,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  text: {
    padding: 15,
    minHeight: 200,
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#212121',
  },
});

export default NewsDetails;
