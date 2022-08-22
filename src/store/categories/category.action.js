// import { getCategoriesAndDocuments } from "../../utils/firebase/firebase-utils";
import { createAction } from "../../utils/reducer/reducer.utils";
import { CATEGORIES_ACTION_TYPES } from "./category.types";

export const setCategories = (categoriesArray) => createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categoriesArray)

// function ini yang akan digunakann untuk memanggil function pada category.saga
// karena pada onFetchCategories yield takeLatest(), men listen `FETCH_CATEGORIES_START`
export const fetchCategoriesStart = () => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START)

export const fetchCategoriesSuccess = (categoriesArray) => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categoriesArray)

export const fetchCategoriesFailed = (error) => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error)

// tidak menggunakan function ini karena sudah terganti dengan redux-saga
// export const fetchCategoriesAsync = () => {
//     return async (dispatch) => {
//         dispatch(fetchCategoriesStart());
//         try {
//             const categoriesArray = await getCategoriesAndDocuments('categories');
//             dispatch(fetchCategoriesSuccess(categoriesArray));
//         } catch (error) {
//             dispatch(fetchCategoriesFailed(error))
//         }
//     }
// }
