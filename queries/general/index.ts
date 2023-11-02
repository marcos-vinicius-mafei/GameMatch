export { default as useGameGenres } from './useGameGenres';
export { default as usePlatforms } from './usePlatforms';
export { default as useGames } from './useGames';

export const generalKeys = {
  all: ['general-all'] as const,
  genres: () => [...generalKeys.all, 'genres'] as const,
  platforms: () => [...generalKeys.all, 'platforms'] as const,
  gamesGeneral: () => [...generalKeys.all, 'games'] as const,
  games: (genresIds: number[], platformsIds: number[]) =>
    [...generalKeys.gamesGeneral(), genresIds, platformsIds] as const,
} as const;
