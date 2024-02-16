import { IProduct } from '../interfaces/products.interface';
import { Utils } from '../utils/Utils';

export class Product {
  private _product!: IProduct;
  constructor(name: string, category: string, isFoodProduct: boolean) {
    this.product = {
      productId: Utils.generateUid(),
      name,
      category,
      isFoodProduct,
    };
  }
  get product() {
    return this._product;
  }
  set product(value: IProduct) {
    this._product = value;
  }
}
