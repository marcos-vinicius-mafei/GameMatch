import { View, StyleSheet } from 'react-native';
import React from 'react';
import { Game } from '../types';
import { Image } from 'expo-image';
import { useTheme } from 'react-native-paper';
import Typography from './Typography';
import CardSection from './CardSection';

interface Props {
  game: Game;
}

const GameCard = ({ game }: Props) => {
  const { colors } = useTheme();

  const releaseDate = new Date(game.released).toLocaleDateString();

  return (
    <View style={[styles.container, { backgroundColor: colors.backdrop }]}>
      <Image
        source={game.background_image}
        contentFit='fill'
        placeholder={require('../assets/images/GMAppIcon.png')}
        placeholderContentFit='cover'
        transition={500}
        style={styles.image}
      />
      <Typography variant='titleLarge' style={styles.title}>
        {game.name}
      </Typography>
      <View style={styles.content}>
        {game.genres && (
          <CardSection
            title='Genres'
            value={game.genres.map(el => el.name).join(', ')}
          />
        )}
        <CardSection title='Release' value={releaseDate} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    borderRadius: 12,
    marginBottom: 32,
  },
  image: {
    width: '100%',
    height: 150,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  title: {
    marginTop: 16,
    textAlign: 'center',
  },
  content: {
    padding: 16,
    paddingTop: 0,
  },
});

export default GameCard;
