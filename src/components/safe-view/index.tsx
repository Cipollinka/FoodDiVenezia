import React, {PropsWithChildren} from 'react';
import {
  View,
  StyleProp,
  ViewStyle,
  StyleSheet,
  SafeAreaView,
  Dimensions,
  TouchableOpacity, Image,
} from 'react-native';
import {ChevronLeft} from 'lucide-react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

import {goBack} from 'app/navigationRef';
import Text from '../text';

interface IProps {
  inset?: boolean;
  bg?: string;
  title?: string;
  showBackButton?: boolean;
  style?: StyleProp<ViewStyle>;
  rightButton?: React.ReactElement | null;
}

const {width} = Dimensions.get('window');

const SafeView: React.FC<PropsWithChildren<IProps>> = ({
  style,
  inset,
  title = '',
  bg = '#171717',
  showBackButton = false,
  children,
  rightButton,
}) => {
  return (
    <SafeAreaView style={[styles.container, style, {backgroundColor: bg}]}>
      <Image source={require('../../assets/images/bg.png')} style={{flex:1, width:'100%', height: '100%'}}/>
      <View style={{flex:1, width:'100%', height:'100%', backgroundColor: 'black', opacity: 0.5}} />
      <View style={styles.header}>
        <View style={styles.flex}>
          {showBackButton && (
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => goBack()}>
              <ChevronLeft size={24} color="#837552" />
              <Text fontWeight="600" color="#837552">
                Back
              </Text>
            </TouchableOpacity>
          )}
        </View>
        {title && (
          <View style={styles.flex}>
            <Text fontWeight="500" ta="center">
              {title}
            </Text>
          </View>
        )}
        <View style={styles.flex2}>{rightButton}</View>
      </View>

      <KeyboardAwareScrollView
        contentContainerStyle={[styles.scrollView]}
        style={[styles.view, inset ? styles.inset : null]}
        showsVerticalScrollIndicator={false}>
        {children}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  footer: {
    height: 40,
  },
  scrollView: {
    minHeight: '100%',
    paddingBottom: width <= 375 ? 60 : 110,
  },
  flex: {
    flex: 1,
  },
  flex2: {
    flex: 1,
    alignItems: 'flex-end',
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  view: {
    flex: 1,
    paddingTop: 10,
    paddingHorizontal: 16,
  },
  inset: {
    paddingHorizontal: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
});

export default SafeView;
