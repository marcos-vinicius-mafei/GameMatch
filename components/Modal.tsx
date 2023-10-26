import React from 'react';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProps,
} from '@gorhom/bottom-sheet';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';
import { useTheme } from 'react-native-paper';
import { StyleSheet } from 'react-native';

export interface ModalProps extends BottomSheetModalProps {
  modalRef: React.Ref<BottomSheetModalMethods>;
}

const Modal = ({ modalRef, snapPoints, index, ...rest }: ModalProps) => {
  const { colors } = useTheme();

  return (
    <BottomSheetModal
      {...rest}
      ref={modalRef}
      backdropComponent={BottomSheetBackdrop}
      index={index || 1}
      snapPoints={snapPoints || ['25%', '50%']}
      handleIndicatorStyle={[
        styles.handle,
        { backgroundColor: colors.onSurfaceVariant },
      ]}
      backgroundStyle={{ backgroundColor: colors.surfaceVariant }}
    />
  );
};

const styles = StyleSheet.create({
  handle: { width: '15%', height: 6 },
});

export default Modal;
