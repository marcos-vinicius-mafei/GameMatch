import React from 'react';
import { StyleSheet } from 'react-native';
import { ActivityIndicator, ActivityIndicatorProps } from 'react-native-paper';

const FooterLoading = (props: ActivityIndicatorProps) => {
  return <ActivityIndicator {...props} style={[styles.loading, props.style]} />;
};

const styles = StyleSheet.create({
  loading: {
    marginTop: 8,
  },
});

export default FooterLoading;
