import React from 'react';
import { View, Text, Image, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export default function Footer() {
  return (
    <View style={styles.container}>
      <View style={styles.copyRightContainer}>
        <Text style={styles.copyRightText}>&copy; 2023 NEAR. All Rights Reserved</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    width: width,
    alignItems: 'center',
    backgroundColor: 'black',
  },
  copyRightContainer: {
    marginTop: 32,
  },
  copyRightText: {
    fontFamily: 'opensans',
    fontSize: 14,
    textAlign: 'center',
    color: 'white',
  },
});