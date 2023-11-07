import { Alert, ScrollView, StyleSheet, View } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import React, { useState } from 'react';
import Modal, { ModalProps } from './Modal';
import Typography from './Typography';
import { BottomSheetFooter, BottomSheetView } from '@gorhom/bottom-sheet';
import { useGameGenres, usePlatforms } from '../queries';
import { Genre, ParentPlatform } from '../types';
import { Button, Chip } from 'react-native-paper';
import FooterLoading from './FooterLoading';
import { BottomSheetDefaultFooterProps } from '@gorhom/bottom-sheet/lib/typescript/components/bottomSheetFooter/types';

type Props = Pick<ModalProps, 'modalRef'> & {
  updateFilters: (genresIds: number[], platformIds: number[]) => void;
  genresIds: number[];
  platformsIds: number[];
};

function alertMaxReached(type: 'genres' | 'platforms') {
  Alert.alert(
    `You can only select up to ${MAX_SELECTION[type]} ${type}`,
    undefined,
    [{ text: 'OK', style: 'cancel' }],
  );
}

function alertSelectBoth() {
  Alert.alert(
    'You must select at least one genre and one platform',
    undefined,
    [{ text: 'OK', style: 'cancel' }],
  );
}

const MAX_SELECTION = {
  genres: 4,
  platforms: 5,
};

const SearchModal = ({
  modalRef,
  genresIds,
  platformsIds,
  updateFilters,
}: Props) => {
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

  const [activeGenres, setActiveGenres] = useState(genresIds);
  const [activePlatforms, setActivePlatforms] = useState(platformsIds);

  function onGenrePress(item: Genre) {
    if (activeGenres.includes(item.id)) {
      const filteredGenres = activeGenres.filter(el => el !== item.id);
      setActiveGenres(filteredGenres);
      return;
    }

    if (activeGenres.length === MAX_SELECTION.genres) {
      alertMaxReached('genres');
      return;
    }

    setActiveGenres([...activeGenres, item.id]);
  }

  function onPlatformPress(item: ParentPlatform) {
    if (activePlatforms.includes(item.id)) {
      const filteredPlatforms = activePlatforms.filter(el => el !== item.id);
      setActivePlatforms(filteredPlatforms);
      return;
    }

    if (activePlatforms.length === MAX_SELECTION.platforms) {
      alertMaxReached('platforms');
      return;
    }

    setActivePlatforms([...activePlatforms, item.id]);
  }

  const renderGenreItem = ({ item }: { item: Genre }) => {
    return (
      <Chip
        style={styles.chip}
        elevated
        elevation={2}
        selected={activeGenres.includes(item.id)}
        onPress={() => onGenrePress(item)}>
        {item.name}
      </Chip>
    );
  };

  const renderPlatformItem = ({ item }: { item: ParentPlatform }) => {
    return (
      <Chip
        style={styles.chip}
        elevated
        elevation={2}
        selected={activePlatforms.includes(item.id)}
        onPress={() => onPlatformPress(item)}>
        {item.name}
      </Chip>
    );
  };

  function onDismiss() {
    setActiveGenres(genresIds);
    setActivePlatforms(platformsIds);
  }

  function onSearchPress() {
    if (!activeGenres.length || !activePlatforms.length) {
      alertSelectBoth();
      return;
    }
    updateFilters(activeGenres, activePlatforms);
    (modalRef as any)?.current?.dismiss();
  }

  const renderFooter = (props: BottomSheetDefaultFooterProps) => {
    if (isError) return null;
    return (
      <BottomSheetFooter {...props}>
        <Button
          mode='contained'
          style={styles.searchButton}
          onPress={onSearchPress}>
          <Typography
            variant='titleLarge'
            fontFamily='RussoOne'
            textColor='onPrimary'>
            Search 😎
          </Typography>
        </Button>
      </BottomSheetFooter>
    );
  };

  function retry() {
    if (genreError && !isFetchingGenres) {
      refetchGenres();
    }
    if (platformError && !isFetchingPlatforms) {
      refetchPlatforms();
    }
  }

  return (
    <Modal
      modalRef={modalRef}
      snapPoints={['30%', '50%', '65%']}
      index={1}
      footerComponent={renderFooter}
      onDismiss={onDismiss}>
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
              <View style={styles.sectionHeader}>
                <Typography
                  variant='titleMedium'
                  textColor='onSurfaceVariant'
                  style={styles.sectionTitle}>
                  Genres
                </Typography>
                <Typography
                  variant='titleSmall'
                  textColor='tertiary'
                  style={styles.sectionTitle}>
                  {`(Max: ${MAX_SELECTION.genres})`}
                </Typography>
              </View>
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
            <View style={styles.sectionContainer}>
              <View style={styles.sectionHeader}>
                <Typography
                  variant='titleMedium'
                  textColor='onSurfaceVariant'
                  style={styles.sectionTitle}>
                  Platforms
                </Typography>
                <Typography
                  variant='titleSmall'
                  textColor='tertiary'
                  style={styles.sectionTitle}>
                  {`(Max: ${MAX_SELECTION.platforms})`}
                </Typography>
              </View>
              <FlatList
                ListFooterComponent={
                  isFetchingPlatforms ? (
                    <FooterLoading style={styles.footerLoading} />
                  ) : null
                }
                showsHorizontalScrollIndicator={false}
                horizontal
                data={platformsData}
                renderItem={renderPlatformItem}
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
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  searchButton: {
    marginBottom: 32,
    width: '80%',
    alignSelf: 'center',
  },
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
