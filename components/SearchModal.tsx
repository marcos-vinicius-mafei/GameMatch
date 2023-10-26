import { ScrollView, StyleSheet, View } from 'react-native';
import React from 'react';
import Modal, { ModalProps } from './Modal';
import Typography from './Typography';
import { BottomSheetView } from '@gorhom/bottom-sheet';

type Props = Pick<ModalProps, 'modalRef'>;

const SearchModal = ({ modalRef }: Props) => {
  return (
    <Modal modalRef={modalRef} snapPoints={['30%', '50%', '65%']} index={1}>
      <BottomSheetView>
        <View style={styles.titleWrapper}>
          <Typography variant='titleLarge' style={styles.title}>
            Select the filters below that match your desired game
          </Typography>
        </View>
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.sectionContainer}>
            <Typography
              variant='titleMedium'
              textColor='onSurfaceVariant'
              style={styles.sectionTitle}>
              Genres
            </Typography>
          </View>
        </ScrollView>
      </BottomSheetView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  titleWrapper: {
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingBottom: 8,
  },
  title: {
    textAlign: 'center',
  },
  scrollView: {
    paddingVertical: 24,
  },
  sectionContainer: {
    marginVertical: 8,
  },
  sectionTitle: {
    paddingHorizontal: 16,
  },
});

export default SearchModal;
