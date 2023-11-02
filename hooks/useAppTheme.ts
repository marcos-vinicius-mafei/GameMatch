import { useTheme } from 'react-native-paper';
import { DarkTheme } from '../styles';
import { MD3Colors } from 'react-native-paper/lib/typescript/types';

export type AppTheme = typeof DarkTheme;

export type AppColors = MD3Colors & {
  card: string;
  onCard: string;
};

const useAppTheme = () => useTheme<AppTheme>();

export default useAppTheme;
