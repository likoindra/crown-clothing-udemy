import { createSelector } from "reselect";
import { CategoriesState } from "./category.reducer";
import { CategoryMap } from "./category.types";
import { RootState } from "../store";

// data awal yang di dapatkan pada saat fetch dari state.categories
const selectCategoriesReducer = (state: RootState): CategoriesState => state.categories;

// create memoize selector
// createSelector function takes 2 arguments
// memoize input akan  berjalan jika ada input yang sama 
export const selectCategories = createSelector(
  // array of input selectors
  [selectCategoriesReducer],

  // output  selectors
  (categoriesSlice) => categoriesSlice.categories
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories): CategoryMap => 
  categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {} as CategoryMap)
);

// spinner selector 
export const selectCategoriesIsLoading = createSelector(
  [selectCategoriesReducer],
  (categoriesSlice) => categoriesSlice.isLoading
)

// export const selectCategoriesMap = (state) => {
//   return state.categories.categories.reduce((acc, category) => {
//     console.log('selector 3 fired')
//     const { title, items } = category;
//     acc[title.toLowerCase()] = items;
//     return acc;
//   }, {});
// };
