// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { CATEGORIES_ACTION_TYPES, Category } from "./category.types";
import { 
  // CategoryAction, 
  fetchCategoriesStart, fetchCategoriesSuccess, fetchCategoriesFailed} from "./category.action";
import { AnyAction } from "redux";

export type CategoriesState = {
    // membuat state tidak bisa di rubah  / readonly 
    readonly categories : Category[];
    readonly isLoading : boolean;
    readonly error : Error | null;
}
 
export const CATEGORY_INITAL_STATE : CategoriesState = {
  categories: [],
  isLoading: false,
  error: null
};


// inisialisasi action dengan `CategoryAction` 
export const categoriesReducer = (state = CATEGORY_INITAL_STATE, action: AnyAction ): CategoriesState => {
  // convert switch case function dengan function baru setelah update pada category.action
  if(fetchCategoriesStart.match(action)) {
    return { ...state, isLoading: true}
  }

  if(fetchCategoriesSuccess.match(action)){
    return { ...state, isLoading: false, categories: action.payload}
  }

  if(fetchCategoriesFailed.match(action)){
    return {...state, isLoading: false, error: action.payload}
  }

  // mengembalikan state ke awal jika tidak match dengan kondisi diatas 
  return state;

  // merubah function dibawah dengan `action` dari `CategoryAction` 
  // const { type, payload } = action;
  // switch (action.type) {
  //   case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START:
  //     return {
  //       ...state,
  //       isLoading: true,
  //   }
  //   case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS:
  //     return {
  //       ...state,
  //       isLoading: false,
  //       categories: action.payload,
  //   }
  //   case CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED:
  //     return {
  //       ...state,
  //       isLoading: false,
  //       error: action.payload
  //   }
  //     default: 
  //     return state;
  // }
};
