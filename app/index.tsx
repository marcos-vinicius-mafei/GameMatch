import { Dimensions, FlatList, Image, StyleSheet, View } from 'react-native';
import React from 'react';
import { Typography, FooterLoading } from '../components';
import {
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import { Button, FAB, useTheme } from 'react-native-paper';

const isError = false;

const isLoading = false;

function retry() {
  console.log('retry');
}

function openModal() {
  console.log('open modal');
}

const HomeScreen = () => {
  const { colors } = useTheme();

  const { bottom } = useSafeAreaInsets();

  return (
    <SafeAreaView style={styles.container}>
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
        data={[]}
        renderItem={null}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={
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
        }
        ListHeaderComponent={
          <View style={styles.phrasesContainer}>
            <Typography variant='headlineMedium' fontFamily='RussoOne'>
              {'Search\nPlay\nHave fun'}
            </Typography>
          </View>
        }
        ListFooterComponent={
          isLoading ? (
            <FooterLoading />
          ) : isError ? (
            <View style={styles.errorContainer}>
              <Typography variant='headlineMedium' textColor='error'>
                Something went Wrong 😔
              </Typography>
              <Button
                mode='contained'
                style={styles.tryAgainButton}
                onPress={retry}>
                Try Again
              </Button>
            </View>
          ) : null
        }
      />
    </SafeAreaView>
  );
};

const { height } = Dimensions.get('window');

const EXTRA_BOTTOM_SPACE = 16;

const styles = StyleSheet.create({
  absoulteContainer: {
    position: 'absolute',
    right: 16,
    zIndex: 99,
  },
  listContent: {
    flex: 1,
    paddingBottom: 16,
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
