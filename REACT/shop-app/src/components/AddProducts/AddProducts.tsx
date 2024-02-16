import { Dispatch, SetStateAction, useState } from 'react';
import styles from './AddProducts.module.css';
import { IProduct } from '../../common/interfaces/products.interface';
import { Product } from '../../common/classes/Product';
import { FiltersTypeEnum } from '../../common/interfaces/filters.enum';
export default function AddProducts({
  setProductsList,
}: {
  setProductsList: Dispatch<SetStateAction<IProduct[]>>;
}) {
  const [name, setName] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [isFoodProduct, setIsFoodProduct] = useState<boolean>(false);

  function handleAddProdcutBtnClick(): void {
    setProductsList((prev: IProduct[]) => {
      return [...prev, new Product(name, category, isFoodProduct).product];
    });
    resetInputs();
  }

  function changedFiltersListener(
    event: { target: { value: string; checked?: boolean } },
    type: FiltersTypeEnum
  ): void {
    switch (type) {
      case FiltersTypeEnum.NAME: {
        setName(event.target.value ?? '');
        break;
      }
      case FiltersTypeEnum.CATEGORY: {
        setCategory(event.target.value ?? '');
        break;
      }
      case FiltersTypeEnum.IS_FOOD_PRODUCT: {
        setIsFoodProduct(event.target.checked ?? false);
        break;
      }
    }
  }

  function resetInputs(): void {
    setName('');
    setCategory('');
    setIsFoodProduct(false);
  }
  return (
    <div className={styles['add-products']}>
      <h1>Add products</h1>

      <div>
        <label>Name: </label>
        <input
          type="text"
          value={name}
          onChange={(event) =>
            changedFiltersListener(event, FiltersTypeEnum.NAME)
          }
        />
      </div>

      <div>
        <label>Category: </label>
        <input
          type="text"
          value={category}
          onChange={(event) =>
            changedFiltersListener(event, FiltersTypeEnum.CATEGORY)
          }
        />
      </div>

      <div>
        <label>Food only</label>
        <input
          type="checkbox"
          checked={isFoodProduct}
          onChange={(event) =>
            changedFiltersListener(event, FiltersTypeEnum.IS_FOOD_PRODUCT)
          }
        />
      </div>

      <button onClick={() => handleAddProdcutBtnClick()}>Add product</button>
    </div>
  );
}
