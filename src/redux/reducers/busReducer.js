import React from 'react';

const defaultState = {
    busDetails: {
        busNo: '',
        onDuty: null
    }
}

export default (state = defaultState, actions) => {
    switch(actions.type){
        case 'INITIALIZE_BUS':
            return actions.payload
        default: 
            return state
    }
}