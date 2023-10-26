import React from 'react';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProps,
} from '@gorhom/bottom-sheet';
import { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types';

interface Props extends BottomSheetModalProps {
  modalRef: React.Ref<BottomSheetModalMethods>;
}

const Modal = ({ modalRef, snapPoints, ...rest }: Props) => {
  return (
    <BottomSheetModal
      {...rest}
      ref={modalRef}
      backdropComponent={BottomSheetBackdrop}
      index={1}
      snapPoints={snapPoints || ['30%', '50%']}
      handleIndicatorStyle={{ width: '15%', height: 5 }}
    />
  );
};

export default Modal;
