import React, {PropsWithChildren, useEffect, useState} from 'react';
import {View, StyleSheet} from 'react-native';
import Modal from 'react-native-modal';

import Text from '../text';

interface IProps {
  inset?: boolean;
  isOpen: boolean;
  title?: string;
}

const ModalWraper: React.FC<PropsWithChildren<IProps>> = ({
  isOpen,
  title,
  children,
  inset = false,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    setModalVisible(isOpen);
  }, [isOpen]);

  return (
    <Modal isVisible={modalVisible} hasBackdrop backdropOpacity={0.3}>
      <View style={styles.centeredView}>
        <View style={[styles.modalView, inset ? styles.inset : null]}>
          {title && (
            <Text ta="center" fontWeight="600">
              {title}
            </Text>
          )}

          {children}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    marginTop: 22,
  },
  modalView: {
    minHeight: 100,
    margin: '5%',
    backgroundColor: '#000',
    borderRadius: 20,
    paddingHorizontal: 50,
    paddingVertical: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  inset: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
});

export default ModalWraper;
