import { createSelector } from "reselect";


// data awal yang di dapatkan pada saat fetch dari state.categories
const selectCategoryReducer = (state) => state.categories
// console.log("selector 1 fred"); 

// create memoize selector
// createSelector function takes 2 arguments
// memoize input akan  berjalan jika ada input yang sama 
export const selectCategories = createSelector(
  // array of input selectors
  [selectCategoryReducer],

  // output  selectors
  (categoriesSlice) => categoriesSlice.categories
);

export const selectCategoriesMap = createSelector(
  [selectCategories],
  (categories) => {
    // console.log("selector 3 fired");
    return categories.reduce((acc, category) => {
      const { title, items } = category;
      acc[title.toLowerCase()] = items;
      return acc;
    }, {});
  }
);

// export const selectCategoriesMap = (state) => {
//   return state.categories.categories.reduce((acc, category) => {
//     console.log('selector 3 fired')
//     const { title, items } = category;
//     acc[title.toLowerCase()] = items;
//     return acc;
//   }, {});
// };
