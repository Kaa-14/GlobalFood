import Realm from 'realm';
import {FoodSchema} from './FoodSchema';

const realm = new Realm({
  schema: [FoodSchema],
});

export default realm;
