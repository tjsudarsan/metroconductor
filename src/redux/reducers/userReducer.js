import React from 'react';

const defaultState = {
    uid: null,
    from : null,
    to: null
}

export default (state = defaultState, actions) => {
    switch(actions.type){
        case'SAVE_FROM_AND_TO': 
            return Object.assign(state,actions.payload)
        default:
            return state
    }
}