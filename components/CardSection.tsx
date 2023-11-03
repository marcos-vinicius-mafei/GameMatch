import { View, StyleSheet } from 'react-native';
import React from 'react';
import Typography from './Typography';

interface Props {
  title: string;
  value: string | number;
  metacriticSection?: boolean;
}

function getMetacriticColor(value: number) {
  if (value > 70) {
    return '#00CE7A';
  } else if (value < 50) {
    return '#FF6873';
  }
  return '#FFBD3F';
}

const CardSection = ({ title, value, metacriticSection }: Props) => {
  return (
    <View style={styles.container}>
      <Typography variant='titleMedium' textColor='onCard' style={styles.title}>
        {title}
      </Typography>
      <Typography
        variant='labelMedium'
        textColor='onCard'
        customColor={
          metacriticSection ? getMetacriticColor(value as number) : undefined
        }>
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
