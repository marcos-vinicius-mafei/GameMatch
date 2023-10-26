import { useQuery } from '@tanstack/react-query';
import { generalKeys } from '.';
import { ParentPlatform } from '../../types';
import { api } from '../../services/api';

const usePlatforms = () => {
  return useQuery<ParentPlatform[]>({
    queryKey: generalKeys.platforms(),
    queryFn: async () => {
      const { data } = await api.get('platforms/lists/parents');
      return data.results;
    },
    staleTime: Infinity,
  });
};

export default usePlatforms;
