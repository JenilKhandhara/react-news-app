import bookmarkNewsReducer from "./reducers/bookmarkNewsReducer";
import { createStore } from "redux";


const store = createStore(bookmarkNewsReducer)

export default store