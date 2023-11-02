import { View, StyleSheet } from 'react-native';
import React from 'react';
import Typography from './Typography';

interface Props {
  title: string;
  value: string;
}

const CardSection = ({ title, value }: Props) => {
  return (
    <View style={styles.container}>
      <Typography variant='titleMedium' textColor='onCard' style={styles.title}>
        {title}
      </Typography>
      <Typography variant='labelMedium' textColor='onCard'>
        {value}
      </Typography>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 8,
  },
  title: {
    marginBottom: 4,
  },
});

export default CardSection;
