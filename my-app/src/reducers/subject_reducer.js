const initialState = {
  all: {
    items: [],
    isFetched: null
  },
  currentSubject: {
    subject: null,
    isFetched: null
  }
};

export const FETCH_SUBJECTS_REQUEST = 'FETCH_SUBJECTS_REQUEST';
export const FETCH_SUBJECTS_SUCCESS = 'FETCH_SUBJECTS_SUCCESS';

export const FETCH_SUBJECT_REQUEST = 'FETCH_SUBJECT_REQUEST';
export const FETCH_SUBJECT_SUCCESS = 'FETCH_SUBJECT_SUCCESS';

export default function subject_reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SUBJECTS_REQUEST:
      return {
        ...state,
        all: {
          items: [...state.all.items],
          isFetched: false
        }
      };
    case FETCH_SUBJECTS_SUCCESS:
      return {
        ...state,
        all : {
          items: action.payload,
          isFetched: true
        }
      };

    case FETCH_SUBJECT_SUCCESS:
      return {
        ...state,
        currentSubject: {
          subject: action.payload,
          isFetched: true
        }
      };
    case FETCH_SUBJECT_REQUEST:
      return {
        ...state,
        currentSubject: {
          subject: {...state.currentSubject.subject},
          isFetched: false
        }
      };
    default:
      return state;
  }
}
