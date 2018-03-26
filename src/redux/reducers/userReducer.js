import React from 'react';

const defaultState = {
    uid: null,
    from : null,
    to: null,
    fare: null,
    noOfTickets: 1,
    travelHistory: []
}

export default (state = defaultState, actions) => {
    switch(actions.type){
        case'SAVE_FROM_AND_TO': 
            return Object.assign(state,actions.payload)
        
        case 'SAVE_FARE':
            return {...state, fare: actions.payload}

        case 'SAVE_UID':
            return {...state, uid: actions.payload}

        case 'STORE_TRAVEL_HISTORY':
            return {...state, travelHistory: actions.payload}

        default:
            return state
    }
}