import React from 'react';
import {TouchableOpacity, Text, StyleSheet, Image} from 'react-native';
import {Icon} from 'react-native-elements';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen-hooks';

export const StoreComponent = props => {
  const {value, iconName, iconType} = props;
  return (
    <TouchableOpacity style={styles.button} {...props}>
      <Icon name={iconName} type={iconType} size={35} style={styles.icon} />

      <Text style={styles.text}>{value}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 8,
  },
  text: {
    color: 'black',
    fontSize: hp('2.2%'),
    marginLeft: 10,
  },
  icon: {},
});
export default StoreComponent;
