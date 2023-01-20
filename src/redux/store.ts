import bookmarkNewsReducer from "./reducers/bookmarkNewsReducer";
import { createStore } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";


const store = createStore(bookmarkNewsReducer, composeWithDevTools())

export default store