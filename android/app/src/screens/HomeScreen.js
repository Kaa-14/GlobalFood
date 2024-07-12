import {View, Text} from 'react-native';
import React from 'react';
import {StyleSheet} from 'react-native';
import {imageSlider} from '../../../../data/Data';
import {SliderBox} from 'react-native-image-slider-box';
import {Image, FlatList, TouchableOpacity} from 'react-native';
import {categoryList} from '../../../../data/Data';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen-hooks';
import {Divider} from 'react-native-elements';

const HomeScreen = props => {
  const {navigation} = props;
  return (
    <View style={styles.mainContainer}>
      <SliderBox
        images={imageSlider}
        autoplay={true}
        circleLoop={true}
        sliderBoxHeight={300}
      />

      <View style={styles.titleContainer}>
        <Text style={styles.text}>CATEGORIES</Text>
      </View>
      <Divider
        width={1}
        color="black"
        style={{
          marginLeft: wp('20%'),
          marginRight: wp('20%'),
          marginBottom: 5,
          marginTop: 10,
        }}
      />
      <FlatList
        data={categoryList}
        key={2}
        numColumns={2}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.flatListContainer}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={styles.button}
              onPress={() =>
                navigation.navigate('ShowFood', {categoryId: item.id})
              }>
              <Image source={{uri: item.icon}} style={styles.icon} />
              <Text style={styles.itemName}>{item.name}</Text>
            </TouchableOpacity>
          );
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: 'white',
    flex: 1,
  },
  titleContainer: {
    marginTop: 16,
    alignItems: 'center',
  },
  text: {
    fontSize: hp('2.4%'),
    fontWeight: 'bold',
    color: 'black',
    fontFamily: 'Poppins-Medium',
  },
  flatListContainer: {
    padding: 8,
  },
  button: {
    flex: 1,
    margin: 8,
    borderWidth: 1,
    borderColor: '#66B2FF',
    borderRadius: 10,
    height: hp('21%'),
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: wp('30%'),
    height: hp('13%'),
    resizeMode: 'cover',
  },
  itemName: {
    color: 'black',
    padding: 5,
    fontFamily: 'Poppins-Medium',
    fontSize: hp('2%'),
  },
});
export default HomeScreen;
