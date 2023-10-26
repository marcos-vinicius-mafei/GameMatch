import { useQuery } from '@tanstack/react-query';
import { generalKeys } from '.';
import { Genre } from '../../types';
import { api } from '../../services/api';
import { GeneralResponse } from '..';

const useGameGenres = () => {
  return useQuery<GeneralResponse<Genre>>({
    queryKey: generalKeys.genres(),
    queryFn: async () => {
      const { data } = await api.get('genres', {
        params: { ordering: 'name' },
      });
      return data;
    },
    staleTime: Infinity,
  });
};

export default useGameGenres;
