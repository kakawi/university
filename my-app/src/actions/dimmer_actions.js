import * as types from '../reducers/dimmer_reducer';

export function dimmerStart() {
    return {
        type: types.DIMMER_START
    }
}

export function dimmerStop() {
    return {
        type: types.DIMMER_STOP
    }
}