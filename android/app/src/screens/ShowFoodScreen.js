import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import realm from '../../../../store/realm';
import {Icon, CheckBox} from 'react-native-elements';
import {categoryList} from '../../../../data/Data';
import StoreComponent from '../components/StoreComponent';
import {ButtonComponent} from '../components/ButtonComponent';
import {Linking} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen-hooks';
import {Alert} from 'react-native';

const ShowFoodScreen = props => {
  const {navigation} = props;
  const {route} = props;
  const categori = route.params.categoryId;

  const [data, setData] = useState([]);

  const collectData = () => {
    const allData = realm.objects('Food').filtered(`category = ${categori}`);

    const newData = allData.map(item => {
      item.checkedStatus = false;
      return item;
    });
    setData(allData);
  };

  const [isBuy, setIsBuy] = useState(false);
  const [store, setStore] = useState({
    storeName: '',
    googleMaps: '',
  });

  const buyProduct = (storeName, googleMaps) => {
    setStore({
      storeName: storeName,
      googleMaps: googleMaps,
    });

    setIsBuy(true);
  };

  const [isRemove, setIsRemove] = useState(false);

  const setCheckbox = (id, status) => {
    const newData = data.map(item => {
      if (item.id === id) {
        item.checkedStatus = !status;
      }
      console.log(status);
      return item;
    });
    setData(newData);
  };

  const onCancel = () => {
    const newData = data.map(item => {
      item.chekcedStatus = false;
      return item;
    });
    setData(newData);
    setIsRemove(false);
  };

  const onDelete = () => {
    const checkedTrue = [];

    data.forEach(item => {
      if (item.checkedStatus) {
        checkedTrue.push(item.id);
      }
    });
    if (checkedTrue.length !== 0) {
      realm.write(() => {
        for (i = 0; i < checkedTrue.length; i++) {
          const data = realm.objects('Food').filtered(`id = ${checkedTrue[i]}`);
          realm.delete(data);
        }
      });
      collectData();
      setIsRemove(false);
      alert('Successfully delete your food!');
    } else {
      alert('Nothing to remove!');
    }
  };

  const onClickMedia = () => {
    Linking.openURL(store.googleMaps);
  };

  const deleteConfirmation = () => {
    Alert.alert('Delete Food', 'Are you sure to delete this food?', [
      {
        text: 'NO',
      },
      {
        text: 'YES',
        onPress: () => onDelete(),
      },
    ]);
  };

  useEffect(() => {
    const foodPage = navigation.addListener('focus', () => {
      collectData();
    });
    return foodPage;
  }, []);

  return (
    <View style={styles.mainContainer}>
      <FlatList
        ListEmptyComponent={
          <Text
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              color: 'black',
            }}>
            No Items
          </Text>
        }
        data={data}
        contentContainerStyle={styles.flatListContainer}
        keyExtractor={item => item.id}
        renderItem={({item}) => {
          return (
            <TouchableOpacity
              style={styles.itemButton}
              onPress={() =>
                navigation.navigate('EditFood', {idProduct: item.id})
              }
              onLongPress={() => setIsRemove(true)}>
              <View style={styles.productContainer}>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('ImageZoom', {
                      imagePath: item.imagePath,
                    })
                  }>
                  <Image style={styles.image} source={{uri: item.imagePath}} />
                </TouchableOpacity>
                <View style={styles.textContainer}>
                  <Text style={styles.title}>{item.foodName}</Text>
                  <Text style={styles.text}>
                    {categoryList[item.category - 1].name}
                  </Text>
                  <Text style={styles.text}>Rp. {item.price}</Text>
                </View>
              </View>
              {isRemove ? (
                <CheckBox
                  size={30}
                  containerStyle={styles.checkBox}
                  onPress={() => setCheckbox(item.id, item.checkedStatus)}
                  checked={item.checkedStatus}
                />
              ) : (
                <TouchableOpacity
                  onPress={() => buyProduct(item.storeName, item.googleMaps)}>
                  <Icon name="shoppingcart" type="antdesign" size={30} />
                </TouchableOpacity>
              )}
            </TouchableOpacity>
          );
        }}
      />
      {isBuy ? (
        <View style={styles.modalContainer}>
          <View style={styles.box}>
            <TouchableOpacity
              style={styles.cancel}
              onPress={() => setIsBuy(false)}>
              <Icon name="close" type="antdesign" size={20} />
            </TouchableOpacity>
            <Text style={[styles.sellerText, styles.title]}>
              Contact the seller through this store :
            </Text>
            {store.storeName !== '' ? (
              <StoreComponent
                value={store.storeName}
                iconName="shop"
                iconType="entypo"
                onPress={() => onClickMedia('storeName')}
              />
            ) : null}
            {store.googleMaps !== '' ? (
              <StoreComponent
                value={'Location'}
                iconName="location"
                iconType="entypo"
                onPress={() => onClickMedia('googleMaps')}
              />
            ) : null}
          </View>
        </View>
      ) : null}
      {isRemove ? (
        <View style={styles.buttonContainer}>
          <ButtonComponent
            backgroundColor="red"
            title="Delete"
            onPress={() => deleteConfirmation()}
          />

          <ButtonComponent
            backgroundColor="#66B2FF"
            title="Cancel"
            onPress={() => onCancel()}
          />
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  flatListContainer: {
    padding: 8,
  },
  itemButton: {
    margin: 8,
    padding: 16,
    borderColor: '#66B2FF',
    borderWidth: 1,
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  productContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  image: {
    width: wp('30%'),
    height: hp('13%'),
    borderRadius: 5,
  },
  textContainer: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  title: {
    color: 'black',
    fontSize: hp('2.4%'),
    fontWeight: 'bold',
    fontFamily: 'Poppins-Medium',
  },
  text: {
    color: 'black',
    fontSize: hp('2%'),
    fontFamily: 'Poppins-Light',
  },
  modalContainer: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  box: {
    width: wp('80%'),
    backgroundColor: 'white',
    padding: 16,
    borderWidth: 1,
    borderColor: '#66B2FF',
    borderRadius: 10,
    alignItems: 'center',
  },
  cancel: {
    padding: 8,
    position: 'absolute',
    right: 8,
    top: 8,
  },
  sellerText: {
    marginBottom: 8,
    marginTop: 32,
  },
  checkBox: {
    position: 'absolute',
    right: 0,
  },
  buttonContainer: {
    flexDirection: 'row',
    height: hp('7%'),
  },
});
export default ShowFoodScreen;
