import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
  MD3Theme,
  MD3LightTheme,
  MD3DarkTheme,
  adaptNavigationTheme,
  configureFonts,
} from 'react-native-paper';

const fonts = configureFonts({
  config: { fontFamily: 'RobotoMedium' },
});

export const LightTheme: MD3Theme = {
  ...MD3LightTheme,
  colors: {
    primary: 'rgb(38, 109, 1)',
    onPrimary: 'rgb(255, 255, 255)',
    primaryContainer: 'rgb(168, 247, 130)',
    onPrimaryContainer: 'rgb(6, 33, 0)',
    secondary: 'rgb(85, 98, 76)',
    onSecondary: 'rgb(255, 255, 255)',
    secondaryContainer: 'rgb(216, 231, 203)',
    onSecondaryContainer: 'rgb(19, 31, 13)',
    tertiary: 'rgb(56, 102, 103)',
    onTertiary: 'rgb(255, 255, 255)',
    tertiaryContainer: 'rgb(187, 235, 236)',
    onTertiaryContainer: 'rgb(0, 32, 33)',
    error: 'rgb(186, 26, 26)',
    onError: 'rgb(255, 255, 255)',
    errorContainer: 'rgb(255, 218, 214)',
    onErrorContainer: 'rgb(65, 0, 2)',
    background: 'rgb(253, 253, 246)',
    onBackground: 'rgb(26, 28, 24)',
    surface: 'rgb(253, 253, 246)',
    onSurface: 'rgb(26, 28, 24)',
    surfaceVariant: 'rgb(223, 228, 215)',
    onSurfaceVariant: 'rgb(67, 72, 62)',
    outline: 'rgb(115, 121, 109)',
    outlineVariant: 'rgb(195, 200, 187)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(47, 49, 45)',
    inverseOnSurface: 'rgb(241, 241, 234)',
    inversePrimary: 'rgb(141, 218, 105)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(242, 246, 234)',
      level2: 'rgb(236, 242, 226)',
      level3: 'rgb(229, 237, 219)',
      level4: 'rgb(227, 236, 217)',
      level5: 'rgb(223, 233, 212)',
    },
    surfaceDisabled: 'rgba(26, 28, 24, 0.12)',
    onSurfaceDisabled: 'rgba(26, 28, 24, 0.38)',
    backdrop: 'rgba(45, 50, 41, 0.4)',
  },
  fonts,
};

export const DarkTheme: MD3Theme = {
  ...MD3DarkTheme,
  colors: {
    primary: 'rgb(141, 218, 105)',
    onPrimary: 'rgb(15, 57, 0)',
    primaryContainer: 'rgb(26, 82, 0)',
    onPrimaryContainer: 'rgb(168, 247, 130)',
    secondary: 'rgb(188, 203, 176)',
    onSecondary: 'rgb(40, 52, 33)',
    secondaryContainer: 'rgb(62, 74, 54)',
    onSecondaryContainer: 'rgb(216, 231, 203)',
    tertiary: 'rgb(160, 207, 208)',
    onTertiary: 'rgb(0, 55, 56)',
    tertiaryContainer: 'rgb(30, 78, 79)',
    onTertiaryContainer: 'rgb(187, 235, 236)',
    error: 'rgb(255, 180, 171)',
    onError: 'rgb(105, 0, 5)',
    errorContainer: 'rgb(147, 0, 10)',
    onErrorContainer: 'rgb(255, 180, 171)',
    background: 'rgb(26, 28, 24)',
    onBackground: 'rgb(227, 227, 220)',
    surface: 'rgb(26, 28, 24)',
    onSurface: 'rgb(227, 227, 220)',
    surfaceVariant: 'rgb(67, 72, 62)',
    onSurfaceVariant: 'rgb(195, 200, 187)',
    outline: 'rgb(141, 146, 135)',
    outlineVariant: 'rgb(67, 72, 62)',
    shadow: 'rgb(0, 0, 0)',
    scrim: 'rgb(0, 0, 0)',
    inverseSurface: 'rgb(227, 227, 220)',
    inverseOnSurface: 'rgb(47, 49, 45)',
    inversePrimary: 'rgb(38, 109, 1)',
    elevation: {
      level0: 'transparent',
      level1: 'rgb(32, 38, 28)',
      level2: 'rgb(35, 43, 31)',
      level3: 'rgb(39, 49, 33)',
      level4: 'rgb(40, 51, 34)',
      level5: 'rgb(42, 55, 35)',
    },
    surfaceDisabled: 'rgba(227, 227, 220, 0.12)',
    onSurfaceDisabled: 'rgba(227, 227, 220, 0.38)',
    backdrop: 'rgba(45, 50, 41, 0.4)',
  },
  fonts,
};

const { LightTheme: NavigationLight, DarkTheme: NavigationDark } =
  adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
    materialDark: DarkTheme,
    materialLight: LightTheme,
  });

export { NavigationLight, NavigationDark };
