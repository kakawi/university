const initialState = {
  all: {
    items: [],
    isFetched: null
  },
  currentSpeciality: {
    speciality: null,
    isFetched: null
  }
};

export const FETCH_SPECIALITIES_REQUEST = 'FETCH_SPECIALITIES_REQUEST';
export const FETCH_SPECIALITIES_SUCCESS = 'FETCH_SPECIALITIES_SUCCESS';
export const FETCH_SPECIALITY_SUCCESS = 'FETCH_SPECIALITY_SUCCESS';
export const FETCH_SPECIALITY_REQUEST = 'FETCH_SPECIALITY_REQUEST';

export default function speciality_reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SPECIALITIES_REQUEST:
      return {
        ...state,
        all: {
          items: [...state.all.items],
          isFetched: false
        }
      };
    case FETCH_SPECIALITIES_SUCCESS:
      return {
        ...state,
        all: {
          items: action.payload,
          isFetched: true
        }
      };

    case FETCH_SPECIALITY_REQUEST:
      return {
        ...state,
        currentSpeciality: {
          speciality: {...state.currentSpeciality.speciality},
          isFetched: false
        }
      };
    case FETCH_SPECIALITY_SUCCESS:
      return {
        ...state,
        currentSpeciality: {
          speciality: action.payload,
          isFetched: true
        }
      };

    default:
      return state;
  }
}
