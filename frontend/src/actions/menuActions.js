import { FETCH_MENU_DISPATCH, FETCH_MENU_FAIL, FETCH_MENU_SUCCESS } from "../constants/MenuConstants"
import axios from 'axios'

export const fetchMenu = () => async(dispatch) => {
    dispatch({type: FETCH_MENU_DISPATCH, loading: true})

    try {
        const {data} = await axios.get('http://localhost:8100/api/meals')

        dispatch({type: FETCH_MENU_SUCCESS, loading: false, payload: data})
    } catch(e) {
        dispatch({type: FETCH_MENU_FAIL, loading: false, payload: data})

    }
}