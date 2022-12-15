import { createStore, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk'
import Reducer from "../reducers";
import {composeWithDevTools} from 'redux-devtools-extension'

const initalState = {}
const middleware = [thunk]

const store = createStore(Reducer ,initalState, compose(composeWithDevTools(applyMiddleware(...middleware))))

export default store