import { View } from 'react-native';
import React from 'react';
import Modal, { ModalProps } from './Modal';
import Typography from './Typography';

type Props = Omit<ModalProps, 'children'>;

const SearchModal = (modalProps: Props) => {
  return (
    <Modal {...modalProps}>
      <View>
        <Typography>hello</Typography>
      </View>
    </Modal>
  );
};

export default SearchModal;
