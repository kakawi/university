const initialState = {
  all: {
    items: [],
    isFetched: null
  },
  currentSet: {
    set: null,
    isFetched: null
  }
};

export const FETCH_SETS_REQUEST = 'FETCH_SETS_REQUEST';
export const FETCH_SETS_SUCCESS = 'FETCH_SETS_SUCCESS';
export const FETCH_SET_SUCCESS = 'FETCH_SET_SUCCESS';
export const FETCH_SET_REQUEST = 'FETCH_SET_REQUEST';

export default function set_reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SETS_REQUEST:
      return {
        ...state,
        all: {
          items: [...state.all.items],
          isFetched: false
        }
      };
    case FETCH_SETS_SUCCESS:
      return {
        ...state,
        all: {
          items: action.payload,
          isFetched: true
        }
      };

    case FETCH_SET_REQUEST:
      return {
        ...state,
        currentSet: {
          set: {...state.currentSet.set},
          isFetched: false
        }
      };
    case FETCH_SET_SUCCESS:
      return {
        ...state,
        currentSet: {
          set: action.payload,
          isFetched: true
        }
      };

    default:
      return state;
  }
}
