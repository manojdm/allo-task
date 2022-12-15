import { combineReducers } from "redux";
import { fetchLabelReducer } from "./labelReducer";
import { fetchMenuReducer } from "./menuReducer";

const Reducer = combineReducers({
    labels: fetchLabelReducer,
    menu: fetchMenuReducer
})

export default Reducer