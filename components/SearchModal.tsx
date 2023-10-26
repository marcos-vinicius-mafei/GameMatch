import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import React, { useCallback } from 'react';
import Modal, { ModalProps } from './Modal';
import Typography from './Typography';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { useGameGenres } from '../queries';
import { Genre } from '../types';
import { Chip } from 'react-native-paper';

type Props = Pick<ModalProps, 'modalRef'>;

const SearchModal = ({ modalRef }: Props) => {
  const { data: genresData } = useGameGenres();

  const renderGenreItem = useCallback(({ item }: { item: Genre }) => {
    return (
      <Chip style={styles.chip} elevated elevation={3}>
        {item.name}
      </Chip>
    );
  }, []);

  console.log(genresData);

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
            <FlatList
              showsHorizontalScrollIndicator={false}
              horizontal
              data={genresData}
              renderItem={renderGenreItem}
              contentContainerStyle={styles.sectionList}
            />
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
  sectionList: {
    paddingLeft: 16,
    paddingRight: 8,
    paddingVertical: 16,
  },
  chip: {
    marginRight: 8,
  },
});

export default SearchModal;
