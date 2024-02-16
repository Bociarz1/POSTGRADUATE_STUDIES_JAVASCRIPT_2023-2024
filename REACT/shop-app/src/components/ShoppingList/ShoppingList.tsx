import { Dispatch, SetStateAction, useState } from 'react';
import { IShoppingProduct } from '../../common/interfaces/products.interface';

export default function ShoppingList({
  products,
  setShoppingList,
}: {
  products: IShoppingProduct[];
  setShoppingList: Dispatch<SetStateAction<IShoppingProduct[]>>;
}) {
  function handleProductClick(uid: string): void {
    setShoppingList((prev: IShoppingProduct[]) => {
      return prev.filter((product: IShoppingProduct) => {
        return uid !== product.uid;
      });
    });
  }
  return (
    <div>
      <h1>Shopping List</h1>
      <ul>
        {products.map((product: IShoppingProduct) => {
          const { name, uid } = product;
          return (
            <li
              key={uid}
              onClick={() => {
                handleProductClick(uid);
              }}>
              <ShoppingListElement name={name} />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function ShoppingListElement({ name }: { name: string }) {
  const [isLineThrough, setIsLineThrough] = useState<boolean>(false);
  return (
    <span
      onContextMenu={() => {
        setIsLineThrough((prev: boolean) => !prev);
      }}
      style={{
        textDecoration: `${isLineThrough ? 'line-through' : 'auto'}`,
      }}>
      {name}
    </span>
  );
}
