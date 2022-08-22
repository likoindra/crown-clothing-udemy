import { takeLatest, all, call, put } from 'redux-saga/effects';
import { getCategoriesAndDocuments } from '../../../utils/firebase/firebase-utils';
import { fetchCategoriesFailed, fetchCategoriesSuccess } from '../category.action';
import { CATEGORIES_ACTION_TYPES } from '../category.types';


// dispatch in saga is using `yield put` 
export function* fetchCategoriesAsync()  {
    try {
        const categoriesArray = yield call(getCategoriesAndDocuments, 'categories');
        // yield call() : seperti function await , jika berhasil akan memanggil `fetchCategoriessSuccess` yang menampung data dari `categoriesArray`
        yield put(fetchCategoriesSuccess(categoriesArray));
        // dispatch(fetchCategoriesSuccess(categoriesArray));
    } catch (error) {
        // jika error , akan memanggil `fetchCategoriesFailed` dan menampung data errornya 
        yield put(fetchCategoriesFailed(error))
        // dispatch(fetchCategoriesFailed(error))
    }
}

export function* onFetchCategories() {
    // takeLatest 
    // takeLates flow: 
    // takeLatest akan memanggil type({FETCH_CATEGORIES_START}) ,setelah itu akan menjalan fetchCategoriesAsync
    yield takeLatest(CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START, fetchCategoriesAsync )
}

// SAGA SETUP EXPORT DEFAULT FUNCTION
export function* categoriesSaga() {
    // all function effect  : menjalankan semua yang pada dalam effect `all` dan berhenti jika semua sudah berhasil / done 

    // step akhir adalah untuk mengirim function pada `yield all` menggunakan `call()` untuk memanggil function `onFetchCategories`
    yield all([call(onFetchCategories)])
}