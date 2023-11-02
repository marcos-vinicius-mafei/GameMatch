import { useInfiniteQuery } from '@tanstack/react-query';
import { generalKeys } from '.';
import { Game } from '../../types';
import { api } from '../../services/api';

interface GameResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Game[];
}

const useGames = (genresIds: number[], platformsIds: number[]) => {
  const query = useInfiniteQuery<GameResponse>({
    queryKey: generalKeys.games(genresIds, platformsIds),
    queryFn: async ({ pageParam = 1 }) => {
      const { data } = await api.get('games', {
        params: {
          parent_platforms: platformsIds.join(),
          genres: genresIds.join(),
          page: pageParam,
        },
      });

      return data;
    },
    getNextPageParam: (lastpage, allPages) =>
      lastpage.next !== null ? allPages.length + 1 : undefined,
    initialPageParam: 1,
    enabled: genresIds.length > 0,
  });

  return { ...query, data: query.data?.pages.flat() || [] };
};

export default useGames;
