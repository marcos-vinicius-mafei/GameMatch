import { StyleSheet, View } from 'react-native';
import React from 'react';
import Typography from '../components/Typography';

const HomeScreen = () => {
  return (
    <View style={styles.container}>
      <Typography variant='headlineLarge'>Home</Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;
