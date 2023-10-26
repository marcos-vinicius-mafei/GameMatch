import { useQuery } from '@tanstack/react-query';
import { generalKeys } from '.';
import { Genre } from '../../types';
import { api } from '../../services/api';

const useGameGenres = () => {
  return useQuery<Genre[]>({
    queryKey: generalKeys.genres(),
    queryFn: async () => {
      const { data } = await api.get('genres', {
        params: { ordering: 'name' },
      });
      return data.results;
    },
    staleTime: Infinity,
  });
};

export default useGameGenres;
