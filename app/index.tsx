import { Dimensions, FlatList, Image, StyleSheet, View } from 'react-native';
import React, { useCallback, useRef, useState } from 'react';
import { Typography, FooterLoading, SearchModal } from '../components';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { Button, FAB, useTheme } from 'react-native-paper';
import { BottomSheetModal } from '@gorhom/bottom-sheet';
import { useGames } from '../queries';
import { Game } from '../types';

function retry() {
  console.log('retry');
}

const HomeScreen = () => {
  const { colors } = useTheme();

  const { bottom } = useSafeAreaInsets();

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  const [genresIds, setGenresIds] = useState<number[]>([]);
  const [platformsIds, setPlatformsIds] = useState<number[]>([]);

  const { data, isLoading, isError, isFetching, fetchNextPage } = useGames(
    genresIds,
    platformsIds,
  );

  const hasData = data.length > 0;

  const isFetchingData = hasData && (isLoading || isFetching);

  function loadMoreGames() {
    if (isFetchingData) return;
    fetchNextPage();
  }

  function renderGameCard({ item }: { item: Game }) {
    return <Typography>{item.name}</Typography>;
  }

  function updateFilters(newGenres: number[], newPlatforms: number[]) {
    setGenresIds(newGenres);
    setPlatformsIds(newPlatforms);
  }

  const openModal = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <SearchModal
        modalRef={bottomSheetModalRef}
        updateFilters={updateFilters}
        genresIds={genresIds}
        platformsIds={platformsIds}
      />
      <View
        style={[
          styles.absoulteContainer,
          { bottom: bottom + EXTRA_BOTTOM_SPACE },
        ]}>
        <FAB icon='magnify' customSize={70} onPress={openModal} />
      </View>
      <View style={styles.inline}>
        <View>
          <Typography variant='headlineLarge' fontFamily='RussoOne'>
            Game Matcher
          </Typography>
          <Typography variant='titleMedium' textColor='primary'>
            Find your next favorite game
          </Typography>
        </View>
        <Image
          style={styles.image}
          source={require('../assets/images/GMAppIcon.png')}
          resizeMode='contain'
        />
      </View>
      <FlatList
        data={data}
        renderItem={renderGameCard}
        contentContainerStyle={hasData ? styles.gamesList : styles.listContent}
        ListEmptyComponent={
          isLoading ? (
            <FooterLoading size='large' style={styles.loadingIndicator} />
          ) : isError ? (
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
            <View style={styles.emptyList}>
              <Typography variant='headlineSmall' style={styles.emptyListTitle}>
                Use our advanced search to find your next adventure!
              </Typography>
              <Image
                source={require('../assets/images/Arrow.png')}
                style={styles.arrow}
                resizeMode='contain'
                tintColor={colors.onBackground}
              />
            </View>
          )
        }
        ListHeaderComponent={
          <View style={styles.phrasesContainer}>
            <Typography variant='headlineMedium' fontFamily='RussoOne'>
              {'Search\nPlay\nHave fun'}
            </Typography>
          </View>
        }
        ListHeaderComponentStyle={styles.listHeader}
        ListFooterComponent={isFetchingData ? <FooterLoading /> : null}
        ListFooterComponentStyle={styles.footer}
        onEndReached={loadMoreGames}
      />
    </SafeAreaView>
  );
};

const { height } = Dimensions.get('window');

const EXTRA_BOTTOM_SPACE = 16;

const styles = StyleSheet.create({
  loadingIndicator: {
    flex: 1,
  },
  absoulteContainer: {
    position: 'absolute',
    right: 16,
    zIndex: 99,
  },
  listContent: {
    flex: 1,
    paddingBottom: 16,
  },
  gamesList: {
    paddingBottom: 70,
  },
  footer: {
    marginVertical: 32,
  },
  listHeader: {
    marginBottom: 16,
  },
  emptyList: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  emptyListTitle: {
    textAlign: 'center',
  },
  arrow: {
    height: height * 0.25,
    aspectRatio: 1,
    marginBottom: height * 0.055 + EXTRA_BOTTOM_SPACE,
    alignSelf: 'flex-end',
    marginRight: 30,
    marginTop: -10,
  },
  container: {
    position: 'relative',
    flex: 1,
    paddingHorizontal: 16,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 32,
  },
  tryAgainButton: {
    marginTop: 8,
  },
  inline: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  image: {
    width: '30%',
    aspectRatio: 1,
  },
  phrasesContainer: {
    marginTop: 16,
  },
});

export default HomeScreen;
