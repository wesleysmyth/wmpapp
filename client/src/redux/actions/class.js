import { SAVE_CLASS_SUCCESS, FETCH_CLASS } from '../constants/class';
import { SEND_FEEDBACK } from '../constants/shared';

import axios from 'axios';

const fetchClass = (id, shouldFetch) => {
    return dispatch => {
        if (shouldFetch) {
            return axios.get(`/class/${id}`)
                .then(response => response.data)
                .then(
                    ({ _class, feedback}) => {

                        localStorage.setItem('currentClass',  _class.id );
                        return dispatch({
                            type: FETCH_CLASS,
                            _class: _class,
                            currentClass: _class.id
                        });
                    },
                    (error) => {
                        const feedback = error.response.data.feedback;
                        return dispatch({ type: SEND_FEEDBACK, feedback });
                    })
        } else {
            dispatch({ type: FETCH_CLASS, currentClass: id });
        }
    }
}

const removeCurrentClass = () => {
    localStorage.removeItem('currentClass');
    return dispatch => {
        return dispatch({ type: FETCH_CLASS, currentClass: null })
    }
}


/** Will create class if class id does not exist **/
/** Will update class otherwise **/

const saveClass = (data) => {
    return dispatch => {
        return axios.post('/class', data)
            .then(response => response.data)
            .then(
                ({ _class, feedback }) => {
                    console.log('_class', _class)
                    dispatch(saveClassSuccess(_class, feedback));
                },
                (error) => {
                    const feedback = error.response.data.feedback;
                    dispatch({ type: SEND_FEEDBACK, feedback });
                })
    }
}

const saveClassSuccess = (_class, feedback) => {
    return {
        type: SAVE_CLASS_SUCCESS,
        _class,
        feedback
    }
};

export {
    fetchClass,
    saveClass,
    removeCurrentClass
};
