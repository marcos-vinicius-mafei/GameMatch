import React from 'react';
import { ExternalLink } from './ExternalLink';
import Typography from './Typography';
import { StyleSheet, View } from 'react-native';

const RawgBacklink = () => {
  return (
    <View style={styles.row}>
      <Typography variant='labelSmall' style={styles.text}>
        Powered by
      </Typography>
      <ExternalLink href='https://rawg.io/'>
        <Typography variant='titleMedium' fontFamily='RussoOne'>
          R A W G
        </Typography>
      </ExternalLink>
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginRight: 4,
  },
});

export default RawgBacklink;
