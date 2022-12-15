import { FETCH_MENU_DISPATCH, FETCH_MENU_FAIL, FETCH_MENU_SUCCESS } from "../constants/MenuConstants";

const fetchMenuReducer = (state = {}, action) => {
    switch(action.type){
        case FETCH_MENU_DISPATCH:
            return {loading: true}
        case FETCH_MENU_SUCCESS:
            return {loading: false, success:true, menus: action.payload}
        case FETCH_MENU_FAIL:
            return {loading: false, success: false}
        default:
            return state
    }
}

export {fetchMenuReducer}