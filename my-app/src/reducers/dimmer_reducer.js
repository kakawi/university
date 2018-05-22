const initialState = {
    isLoading: false
};

export const DIMMER_START = 'DIMMER_START';
export const DIMMER_STOP = 'DIMMER_STOP';

export default function dimmer_reducer(state = initialState, action) {
    switch (action.type) {
        case DIMMER_START:
            return { isLoading: true };

        case DIMMER_STOP:
            return { isLoading: false };

        default:
            return state;
    }
}