import { Dispatch, SetStateAction, useState } from 'react';
import { IFilters } from '../../common/interfaces/filters.interface';
import styles from './Filters.module.css';
import { FiltersTypeEnum } from '../../common/interfaces/filters.enum';
export default function Filters({
  categories,
  setFilters,
}: {
  categories: string[];
  setFilters: Dispatch<SetStateAction<IFilters>>;
}) {
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  function handleResetFiltersBtnClick(): void {
    setFilters({});
    setSelectedCategory('');
  }
  function changedFiltersListener(
    event: { target: { value: string; checked?: boolean } },
    type: FiltersTypeEnum
  ): void {
    if (type === FiltersTypeEnum.CATEGORY) {
      setSelectedCategory(event.target.value);
    }
    setFilters((prev: IFilters) => {
      const filters: IFilters = {
        ...prev,
        [type]:
          type === FiltersTypeEnum.IS_FOOD_PRODUCT
            ? event.target.checked
            : event.target.value,
      };
      if (event.target.value === '') delete filters[type];
      return filters;
    });
  }
  return (
    <div className={styles['filters']}>
      <h1>Filters</h1>

      <div>
        <label>Search by name: </label>
        <input
          type="text"
          onChange={(event) =>
            changedFiltersListener(event, FiltersTypeEnum.NAME)
          }
        />
      </div>

      <div>
        <label>Search by category: </label>
        <select
          value={selectedCategory}
          onChange={(event) =>
            changedFiltersListener(event, FiltersTypeEnum.CATEGORY)
          }>
          <option disabled={true} value="">
            Choose category
          </option>
          {categories.map((category: string, index: number) => {
            return (
              <option key={index} value={category}>
                {category}
              </option>
            );
          })}
        </select>
      </div>

      <div>
        <label>Food only</label>
        <input
          type="checkbox"
          onChange={(event) =>
            changedFiltersListener(event, FiltersTypeEnum.IS_FOOD_PRODUCT)
          }
        />
      </div>

      <button onClick={() => handleResetFiltersBtnClick()}>
        Reset Filters
      </button>
    </div>
  );
}
