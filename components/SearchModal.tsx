import { FlatList, ScrollView, StyleSheet, View } from 'react-native';
import React, { useCallback } from 'react';
import Modal, { ModalProps } from './Modal';
import Typography from './Typography';
import { BottomSheetView } from '@gorhom/bottom-sheet';
import { useGameGenres, usePlatforms } from '../queries';
import { Genre } from '../types';
import { Button, Chip } from 'react-native-paper';
import FooterLoading from './FooterLoading';

type Props = Pick<ModalProps, 'modalRef'>;

const SearchModal = ({ modalRef }: Props) => {
  const {
    data: genresData,
    isError: genreError,
    refetch: refetchGenres,
    isFetching: isFetchingGenres,
  } = useGameGenres();
  const {
    data: platformsData,
    isError: platformError,
    refetch: refetchPlatforms,
    isFetching: isFetchingPlatforms,
  } = usePlatforms();

  const isError = genreError || platformError;

  const renderGenreItem = useCallback(({ item }: { item: Genre }) => {
    return (
      <Chip style={styles.chip} elevated elevation={3}>
        {item.name}
      </Chip>
    );
  }, []);

  function retry() {
    if (genreError && !isFetchingGenres) {
      refetchGenres();
    }
    if (platformError && !isFetchingPlatforms) {
      refetchPlatforms();
    }
  }

  return (
    <Modal modalRef={modalRef} snapPoints={['30%', '50%', '65%']} index={1}>
      <BottomSheetView style={styles.container}>
        <View style={styles.titleWrapper}>
          <Typography variant='titleLarge' style={styles.title}>
            Select the filters below that match your desired game
          </Typography>
        </View>
        {isError ? (
          <View style={styles.errorContainer}>
            <Typography variant='headlineMedium' textColor='onSurfaceVariant'>
              Something went Wrong 😔
            </Typography>
            <Button
              mode='contained'
              style={styles.tryAgainButton}
              onPress={retry}>
              Try Again
            </Button>
          </View>
        ) : (
          <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={styles.sectionContainer}>
              <Typography
                variant='titleMedium'
                textColor='onSurfaceVariant'
                style={styles.sectionTitle}>
                Genres
              </Typography>
              <FlatList
                ListFooterComponent={
                  isFetchingGenres ? (
                    <FooterLoading style={styles.footerLoading} />
                  ) : null
                }
                showsHorizontalScrollIndicator={false}
                horizontal
                data={genresData}
                renderItem={renderGenreItem}
                contentContainerStyle={styles.sectionList}
              />
            </View>
          </ScrollView>
        )}
      </BottomSheetView>
    </Modal>
  );
};

const styles = StyleSheet.create({
  footerLoading: {
    marginHorizontal: 8,
  },
  container: {
    flex: 1,
  },
  errorContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
  },
  tryAgainButton: {
    marginTop: 8,
  },
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
