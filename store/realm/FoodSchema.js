export const FoodSchema = {
  name: 'Food',
  properties: {
    id: 'int',
    foodName: 'string',
    imagePath: 'string',
    category: 'int',
    description: 'string',
    price: 'int',
    googleMaps: 'string',
    storeName: 'string',
  },
  primaryKey: 'id',
};
