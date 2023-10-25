import { FlatList, Image, StyleSheet, View } from 'react-native';
import React from 'react';
import { Typography, FooterLoading } from '../components';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Button, FAB } from 'react-native-paper';

const isError = false;

const isLoading = false;

function retry() {
  console.log('retry');
}

function openModal() {
  console.log('open modal');
}

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.absoulteContainer}>
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

const styles = StyleSheet.create({
  absoulteContainer: {
    position: 'absolute',
    right: 16,
    bottom: 40,
    zIndex: 99,
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
