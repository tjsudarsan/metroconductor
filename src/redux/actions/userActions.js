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