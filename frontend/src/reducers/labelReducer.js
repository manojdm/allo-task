import { FETCH_LABELS_DISPATCH, FETCH_LABELS_FAIL, FETCH_LABELS_SUCCESS } from "../constants/LabelConstants";

const fetchLabelReducer = (state = {}, action) => {
    switch(action.type){
        case FETCH_LABELS_DISPATCH:
            return {loading: true}
        case FETCH_LABELS_SUCCESS:
            return {loading: false, success:true, labels: action.payload}
        case FETCH_LABELS_FAIL:
            return {loading: false, success: false}
        default:
            return state
    }
}

export {fetchLabelReducer}