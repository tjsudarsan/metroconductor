import React from 'react';

export const saveFromAndTo = (from,to) => {
    return ({
        type: 'SAVE_FROM_AND_TO',
        payload: {
            from,
            to
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