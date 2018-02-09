import React from 'react';

const defaultState = {
    uid: null,
    from : null,
    to: null,
    fare: null
}

export default (state = defaultState, actions) => {
    switch(actions.type){
        case'SAVE_FROM_AND_TO': 
            return Object.assign(state,actions.payload)
        
        case 'SAVE_FARE':
            return {...state, fare: actions.payload}

        case 'SAVE_UID':
            return {...state, uid: actions.payload}

        default:
            return state
    }
}