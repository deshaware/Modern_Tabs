import {CURRENT_CONTEXT} from './types';

export default (context) => dispatch => {
    dispatch({type:CURRENT_CONTEXT,payload:context});
};