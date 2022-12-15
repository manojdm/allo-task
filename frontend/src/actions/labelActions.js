import { FETCH_LABELS_DISPATCH, FETCH_LABELS_FAIL, FETCH_LABELS_SUCCESS } from "../constants/LabelConstants"
import axios from 'axios'

export const fetchLabels = () => async(dispatch) => {
    dispatch({type: FETCH_LABELS_DISPATCH, loading: true})

    try {
        const {data} = await axios.get('http://localhost:8100/api/labels')

        dispatch({type: FETCH_LABELS_SUCCESS, loading: false, success: true , payload: data})
    } catch(e) {
        dispatch({type: FETCH_LABELS_FAIL, loading: false, success: false})

    }
}