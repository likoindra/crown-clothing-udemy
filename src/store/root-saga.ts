import { all, call } from "typed-redux-saga/macro";
import { categoriesSaga } from "./categories/category-saga/category.saga";
import { userSagas } from "./user/user-saga/user.saga";

export function* rootSaga() {
  yield* all([call(categoriesSaga), call(userSagas)]);
}
