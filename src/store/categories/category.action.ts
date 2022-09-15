// import { getCategoriesAndDocuments } from "../../utils/firebase/firebase-utils";
import { createAction, ActionWithPayload, Action, withMatcher } from "../../utils/reducer/reducer.utils";
import { CATEGORIES_ACTION_TYPES , Category} from "./category.types";

// export const setCategories = (categoriesArray) => createAction(CATEGORIES_ACTION_TYPES.SET_CATEGORIES, categoriesArray)

// type ini hanya mengirim action untuk parameternya 
export type FetchCategoriesStart = Action<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START>

// mengirim action dan payload 
export type FetchCategoriesSuccess = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, Category[]>

// mengirim action dan payload 
export type FetchCategoriesFailed = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, Error>

// Union types 
// export type CategoryAction = | FetchCategoriesStart | FetchCategoriesSuccess | FetchCategoriesFailed

// function ini yang akan digunakann untuk memanggil function pada category.saga
// karena pada onFetchCategories yield takeLatest(), listen `FETCH_CATEGORIES_START`
export const fetchCategoriesStart = withMatcher(() => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START));

// inisialisasi categoriesArray dengan type pada 'category.types' yaitu Category[]
export const fetchCategoriesSuccess = withMatcher((categoriesArray : Category[]) => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, categoriesArray));

export const fetchCategoriesFailed = withMatcher((error : Error) => createAction(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, error));

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
