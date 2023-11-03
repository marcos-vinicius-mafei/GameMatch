import { View, StyleSheet } from 'react-native';
import React from 'react';
import { Game } from '../types';
import { Image } from 'expo-image';
import Typography from './Typography';
import CardSection from './CardSection';
import { useAppTheme } from '../hooks';

interface Props {
  game: Game;
}

const GameCard = ({ game }: Props) => {
  const { colors } = useAppTheme();

  const releaseDate = new Date(game.released).toLocaleDateString();

  const platforms = game.parent_platforms
    ?.map(el => el?.platform?.name)
    .join(', ');

  return (
    <View style={[styles.container, { backgroundColor: colors.card }]}>
      <Image
        source={game.background_image}
        contentFit='fill'
        placeholder={require('../assets/images/GMAppIcon.png')}
        placeholderContentFit='cover'
        transition={500}
        style={styles.image}
      />

      <View style={styles.content}>
        <Typography
          variant='titleLarge'
          textColor='onCard'
          style={styles.title}>
          {game.name}
        </Typography>
        {game.released !== undefined && (
          <CardSection title='Release' value={releaseDate} />
        )}
        {game.genres && (
          <CardSection
            title='Genres'
            value={game.genres.map(el => el.name).join(', ')}
          />
        )}

        {platforms !== undefined && (
          <CardSection title='Platforms' value={platforms} />
        )}
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
    height: 160,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  title: {
    textAlign: 'center',
  },
  content: {
    padding: 16,
  },
});

export default GameCard;
