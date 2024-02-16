import { useEffect, useState } from 'react';
import { IFilters } from './common/interfaces/filters.interface';
import { products } from './common/consts/products';
import ProductsList from './components/ProductsList/ProductList';
import ShoppingList from './components/ShoppingList/ShoppingList';
import styles from './App.module.css';
import Filters from './components/Filters/Filters';
import {
  IProduct,
  IShoppingProduct,
} from './common/interfaces/products.interface';
import AddProducts from './components/AddProducts/AddProducts';

function App() {
  const [productsList, setProductsList] = useState<IProduct[]>(products);
  const [allProductsCategories, setAllProductsCategories] = useState<string[]>(
    []
  );
  const [filteredProductsList, setFilteredProductsList] =
    useState<IProduct[]>(products);
  const [shoppingList, setShoppingList] = useState<IShoppingProduct[]>([]);
  const [filters, setFilters] = useState<IFilters>({});

  function updateProductsView(): void {
    setFilteredProductsList(() => {
      if (isFilterEmpty()) {
        return productsList;
      } else {
        return productsList.filter((product: IProduct) => {
          if (
            filters.name &&
            !product.name
              .toLowerCase()
              .includes(filters.name.toLocaleLowerCase())
          ) {
            return false;
          }
          if (filters.category && filters.category !== product.category) {
            return false;
          }
          if (
            filters.isFoodProduct !== undefined &&
            filters.isFoodProduct !== product.isFoodProduct
          ) {
            return false;
          }
          return true;
        });
      }
    });
  }

  function showAllCategories(): void {
    const categories: string[] = [];
    productsList.forEach((product: IProduct) => {
      const { category } = product;
      if (categories.includes(category)) return;
      categories.push(category);
    });
    setAllProductsCategories(categories);
  }

  function isFilterEmpty(): boolean {
    return Object.keys(filters).length === 0;
  }

  useEffect(() => {
    updateProductsView();
    showAllCategories();
  }, [filters, productsList]);

  return (
    <>
      <div className={styles['app-container']}>
        <AddProducts setProductsList={setProductsList} />
        <Filters categories={allProductsCategories} setFilters={setFilters} />
        <div className={styles['main-content']}>
          <ProductsList
            products={isFilterEmpty() ? productsList : filteredProductsList}
            setShoppingList={setShoppingList}
          />
          <ShoppingList
            products={shoppingList}
            setShoppingList={setShoppingList}
          />
        </div>
      </div>
    </>
  );
}

export default App;
