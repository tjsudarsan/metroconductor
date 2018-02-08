import React from 'react';

const defaultState = {
    busDetails :{
        _id: null,
        busNo: null,
        routeNo: null,
        origin: null,
        destination: null,
        noOfStages: null,
        journeyTime: null,
        status: null,
        isReverse: null,
        onDuty: null,
        stageNames: [],
        stageWiseFare: []
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