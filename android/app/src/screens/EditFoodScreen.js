import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ScrollView,
  StyleSheet,
} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import React, {useState, useEffect, useRef} from 'react';
import {InputComponent} from '../components/InputComponent';
import SelectDropdown from 'react-native-select-dropdown';
import {categoryList} from '../../../../data/Data';
import {Icon} from 'react-native-elements';
import realm from '../../../../store/realm';
import {Alert} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen-hooks';

const EditFoodScreen = props => {
  const dropdownRef = useRef({});
  const {navigation} = props;
  const {route} = props;
  const idProduct = route.params.idProduct;
  const onInputChange = (type, value) => {
    setFoodData({
      ...foodData,
      [type]: value,
    });
  };

  const [foodData, setFoodData] = useState({
    foodName: '',
    imagePath: '',
    category: 'null',
    description: '',
    price: '',
    googleMaps: '',
    storeName: '',
  });

  const addImage = () => {
    ImagePicker.openPicker({
      width: 2000,
      height: 2000,
      cropping: false,
    })
      .then(image => {
        console.log(image);
        setFoodData({
          ...foodData,
          imagePath: image.path,
        });
      })
      .catch(errorMessage => {
        console.log(errorMessage);
      });
  };

  const saveData = () => {
    if (
      foodData.foodName === '' ||
      foodData.imagePath === '' ||
      foodData.description === '' ||
      foodData.price === '' ||
      foodData.category === ''
    ) {
      alert('Please fill all your food information!');
    } else if (foodData.storeName === '' || foodData.googleMaps === '') {
      alert('Please fill store name and store location!');
    } else {
      const updateData = realm.objects('Food').filtered(`id = ${idProduct}`)[0];
      if (
        foodData.foodName === updateData.foodName &&
        foodData.imagePath === updateData.imagePath &&
        foodData.description === updateData.description &&
        parseInt(foodData.price) === updateData.price &&
        foodData.category === updateData.category &&
        foodData.storeName === updateData.storeName &&
        foodData.googleMaps === updateData.googleMaps
      ) {
        alert('Nothing to update!');
      } else {
        realm.write(() => {
          updateData.foodName = foodData.foodName;
          updateData.imagePath = foodData.imagePath;
          updateData.category = foodData.category;
          updateData.description = foodData.description;
          updateData.price = parseInt(foodData.price);
          updateData.storeName = foodData.storeName;
          updateData.googleMaps = foodData.googleMaps;
        });
        Alert.alert('Success', 'Successfully update your information!', [
          {
            text: 'OK',
            onPress: () => navigation.goBack(),
          },
        ]);
      }

      //   realm.write(() => {
      //     realm.create('Food', {
      //       id: lastId + 1,
      //       foodName: foodData.foodName,
      //       imagePath: foodData.imagePath,
      //       category: foodData.category,
      //       description: foodData.description,
      //       price: parseInt(foodData.price),
      //       storeName: foodData.storeName,
      //       googleMaps: foodData.googleMaps,
      //     });
      //   });

      //   alert('Successfully save your food!');

      //   setFoodData({
      //     foodName: '',
      //     imagePath: '',
      //     category: null,
      //     description: '',
      //     price: '',
      //     storeName: '',
      //     goggleMaps: '',
      //   });
      //   dropdownRef.current.reset();
    }
  };

  useEffect(() => {
    const data = realm.objects('Food').filtered(`id = ${idProduct}`)[0];
    setFoodData({
      foodName: data.foodName,
      imagePath: data.imagePath,
      category: data.category,
      description: data.description,
      price: String(data.price),
      storeName: data.storeName,
      googleMaps: data.googleMaps,
    });
  }, [idProduct]);

  return (
    <View style={styles.mainContainer}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <View style={styles.imageContainer}>
          <TouchableOpacity
            style={styles.imageButton}
            onPress={() => addImage()}>
            <Image
              style={{
                width: foodData.imagePath !== '' ? 200 : 50,
                height: foodData.imagePath !== '' ? 200 : 50,
              }}
              source={{
                uri:
                  foodData.imagePath !== ''
                    ? foodData.imagePath
                    : 'https://t4.ftcdn.net/jpg/01/07/57/91/360_F_107579101_QVlTG43Fwg9Q6ggwF436MPIBTVpaKKtb.jpg',
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.foodNameContainer}>
          <InputComponent
            placeholder="Food Name"
            placeholderTextColor="gray"
            value={foodData.foodName}
            onChangeText={text => onInputChange('foodName', text)}
            style={styles.foodName}
          />
          <SelectDropdown
            data={categoryList}
            defaultValueByIndex={foodData.category - 1}
            defaultButtonText="Select category"
            onSelect={item => {
              onInputChange('category', item.id);
            }}
            buttonTextAfterSelection={item => {
              return item.name;
            }}
            rowTextForSelection={item => {
              return item.name;
            }}
            buttonStyle={styles.selectDropdown}
            buttonTextStyle={styles.selectText}
            isIcon={true}
            name="down"
            type="antdesign"
          />
        </View>

        <View style={styles.horizontalContainer}>
          <InputComponent
            placeholder="Description"
            placeholderTextColor="gray"
            value={foodData.description}
            onChangeText={text => onInputChange('description', text)}
            isDescription={true}
            style={styles.description}
            isIcon={true}
            name="filetext1"
            type="antdesign"
          />
        </View>
        <View>
          <InputComponent
            placeholder="Price (Rp.)"
            placeholderTextColor="gray"
            value={foodData.price}
            onChangeText={text => onInputChange('price', text)}
            keyboardType="numeric"
            isIcon={true}
            name="tag"
            type="antdesign"
          />
        </View>
        <View>
          <InputComponent
            placeholder="Store Name"
            placeholderTextColor="gray"
            value={foodData.storeName}
            onChangeText={text => onInputChange('storeName', text)}
            isIcon={true}
            name="shop"
            type="entypo"
          />
        </View>
        <View>
          <InputComponent
            placeholder="Store Location"
            placeholderTextColor="gray"
            value={foodData.googleMaps}
            onChangeText={text => onInputChange('googleMaps', text)}
            isIcon={true}
            name="location"
            type="entypo"
            style={styles.goggleMaps}
          />
        </View>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => saveData()}>
            <Text style={styles.saveText}>EDIT</Text>
            <Icon name="edit" type="antdesign" />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  scroll: {
    margin: 8,
    paddingBottom: 8,
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 8,
  },
  imageButton: {
    width: wp('51%'),
    height: hp('24.5%'),
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  horizontalContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  foodNameContainer: {
    flex: 1,
    alignItems: 'center',
  },
  foodName: {
    borderBottomWidth: 1,
    textAlignVertical: 'bottom',
    fontSize: 16,
    width: '50%',
    color: 'black',
    textAlign: 'center',
  },
  description: {
    borderBottomWidth: 1,
    textAlignVertical: 'bottom',
    fontSize: 16,
    width: '100%',
    color: 'black',
  },
  goggleMaps: {
    width: '100%',
    borderBottomWidth: 1,
    textAlignVertical: 'bottom',
    fontSize: 16,
    color: 'black',
  },
  buttonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  saveButton: {
    marginTop: 16,
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#99CCFF',
    justifyContent: 'center',
    alignItems: 'center',
    width: wp('27%'),
    height: hp('7.5%'),
    flexDirection: 'row',
  },
  saveText: {
    color: 'black',
    fontWeight: 'bold',
    margin: 5,
    fontFamily: 'Raleway-Medium',
  },
  selectDropdown: {
    borderRadius: 10,
    backgroundColor: '#99CCFF',
    width: 170,
    height: 40,
    marginLeft: 8,
  },
  selectText: {
    fontSize: 16,
  },
});
export default EditFoodScreen;
