import React from 'react';

export const saveFromAndTo = (from,to,noOfTickets) => {
    return ({
        type: 'SAVE_FROM_AND_TO',
        payload: {
            from,
            to,
            noOfTickets
        }
    })
}

export const saveFare = (fare)=>{
    return ({
        type: 'SAVE_FARE',
        payload: fare
    })
}

export const saveUid = (uid) => {
    return ({
        type: 'SAVE_UID',
        payload: uid
    })
}

export const storeTravelHistory = (travelHistory) => ({
    type: 'STORE_TRAVEL_HISTORY',
    payload: travelHistory
})