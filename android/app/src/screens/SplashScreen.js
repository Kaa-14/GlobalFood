import React, {useEffect, useState} from 'react';
import {View, ImageBackground, Image, StyleSheet} from 'react-native';

const SplashScreen = props => {
  const {navigation} = props;

  useEffect(() => {
    setTimeout(() => {
      navigation.replace('Drawer');
    }, 2000);
  }, []);
  return (
    <View style={styles.mainContainer}>
      <Image
        style={styles.imageBackground}
        source={require('../../../../assets/images/splash.png')}></Image>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  imageBackground: {
    width: '100%',
    height: '50%',
    alignItems: 'center',
    resizeMode: 'cover',
  },
});
export default SplashScreen;
