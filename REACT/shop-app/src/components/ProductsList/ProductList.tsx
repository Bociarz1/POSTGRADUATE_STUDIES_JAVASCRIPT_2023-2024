import { Dispatch, SetStateAction } from 'react';
import { Utils } from '../../common/utils/Utils';
import {
  IProduct,
  IShoppingProduct,
} from '../../common/interfaces/products.interface';

export default function ProductsList({
  products,
  setShoppingList,
}: {
  products: IProduct[];
  setShoppingList: Dispatch<SetStateAction<IShoppingProduct[]>>;
}) {
  function handleProductClick(product: IProduct): void {
    setShoppingList((prev: IShoppingProduct[]) => [
      ...prev,
      { ...product, uid: Utils.generateUid() },
    ]);
  }

  return (
    <div style={{ borderRight: '1px #fff solid' }}>
      <h1>Product List</h1>
      <ul>
        {products.map((product: IProduct) => {
          const { name, productId } = product;
          return (
            <li key={productId} onClick={() => handleProductClick(product)}>
              {name}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
