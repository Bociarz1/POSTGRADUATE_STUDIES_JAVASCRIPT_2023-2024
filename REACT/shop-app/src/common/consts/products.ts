import { IProduct } from '../interfaces/filters.interface';
import { Utils } from '../utils/Utils';

export const products: IProduct[] = [
  {
    productId: Utils.generateUid(),
    name: 'Apple',
    category: 'Fruits',
    isFoodProduct: true,
  },
  {
    productId: Utils.generateUid(),
    name: 'Wheat Bread',
    category: 'Bakery',
    isFoodProduct: true,
  },
  {
    productId: Utils.generateUid(),
    name: 'Milk',
    category: 'Dairy',
    isFoodProduct: true,
  },
  {
    productId: Utils.generateUid(),
    name: 'Rice',
    category: 'Grains',
    isFoodProduct: true,
  },
  {
    productId: Utils.generateUid(),
    name: 'Beef',
    category: 'Meat',
    isFoodProduct: true,
  },
  {
    productId: Utils.generateUid(),
    name: 'Carrot',
    category: 'Vegetables',
    isFoodProduct: true,
  },
  {
    productId: Utils.generateUid(),
    name: 'Chocolate',
    category: 'Sweets',
    isFoodProduct: true,
  },
  {
    productId: Utils.generateUid(),
    name: 'Tomato',
    category: 'Vegetables',
    isFoodProduct: true,
  },
  {
    productId: Utils.generateUid(),
    name: 'Mineral Water',
    category: 'Beverages',
    isFoodProduct: true,
  },
  {
    productId: Utils.generateUid(),
    name: 'Whole Bean Coffee',
    category: 'Beverages',
    isFoodProduct: true,
  },
];
