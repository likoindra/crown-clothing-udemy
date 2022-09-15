import { AnyAction } from "redux";

// intersection type 
// merging 2 types 
// type Human = {
//   name: string;
// }

// type Alien = {
//   fly: () => void;
// }

// type Hybrid = Human & Alien;

// const John: Hybrid = {
//   name: 'john',
//   fly: () => {}
// }
// intersection type 

// return type 
// type Human = {
//   name: string
// }
// type MyFunc = () => string

// mendapat return dari `MyFunc` 
// type MyReturn = ReturnType<MyFunc>
// return type 

// matchable type 
// AC = Action Creator 
type Matchable<AC extends () => AnyAction> = AC & {
  type: ReturnType<AC>['type'];
  match(action: AnyAction): action is ReturnType<AC>;
}

// menerima data tanpa paramater 
export function withMatcher<AC extends () => AnyAction & { type: string }>(actionCreator: AC): Matchable<AC>;

// menerima dengan parameter 
export function withMatcher<AC extends (...args: any[]) => AnyAction & { type : string }>(actionCreator: AC): Matchable<AC>;

// function gabungan untuk memanggil kedua type `withMatcher` yang sudah dibuat 
export function withMatcher(actionCreator: Function) {
  const type = actionCreator().type;
  return Object.assign(actionCreator, {
    type,
    // 
    match(action: AnyAction) {
      return action.type === type 
    }
  })
}

// make action and payload type
export type ActionWithPayload<T, P> = {
  type: T;
  payload: P;
};

// Action type
export type Action<T> = {
  type: T;
};

// function yang terpanggil jika terdapat action dan payload 
export function createAction<T extends string, P>(type: T, payload: P): ActionWithPayload<T, P>;

// function yang terpanggil jika hanya terdapat action 
export function createAction<T extends string>(type: T, payload: void):Action<T>;


// converting 'createAction'
export function createAction<T extends string, P>(type: T, payload: P) {
  return { type, payload };
}

// export const createAction = (type, payload) => ({ type, payload });
