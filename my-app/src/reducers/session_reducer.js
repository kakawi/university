const initialState = {
  all: {
    items: [],
    isFetched: null
  },
  currentSession: {
    session: {},
    isSessionFetched: false,
    idCurrentSet: '',
    setsForSession: [],
    isSetsFetched: false,
    subjectsForSet: [],
    isSubjectsFetched: false,
    isShowSet: false,
  }
};

export const FETCH_SESSIONS_REQUEST = 'FETCH_SESSIONS_REQUEST';
export const FETCH_SESSIONS_SUCCESS = 'FETCH_SESSIONS_SUCCESS';

export const FETCH_SESSION_REQUEST = 'FETCH_SESSION_REQUEST';
export const FETCH_SESSION_SUCCESS = 'FETCH_SESSION_SUCCESS';

export const SHOW_SET = 'SHOW_SET';
export const CLOSE_SET = 'CLOSE_SET';
export const CHOOSE_SET = 'CHOOSE_SET';

export const ADD_SUBJECT_REQUEST = 'ADD_SUBJECT_REQUEST';
export const ADD_SUBJECT_SUCCESS = 'ADD_SUBJECT_SUCCESS';

export const FETCH_SETS_BY_SESSION_REQUEST = 'FETCH_SETS_BY_SESSION_REQUEST';
export const FETCH_SETS_BY_SESSION_SUCCESS = 'FETCH_SETS_BY_SESSION_SUCCESS';

export const FETCH_SUBJECTS_BY_SESSION_AND_SET_REQUEST = 'FETCH_SUBJECTS_BY_SESSION_AND_SET_REQUEST';
export const FETCH_SUBJECTS_BY_SESSION_AND_SET_SUCCESS = 'FETCH_SUBJECTS_BY_SESSION_AND_SET_SUCCESS';


export default function session_reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_SESSIONS_REQUEST:
      return {
        ...state,
        all: {
          items: [...state.all.items],
          isFetched: false
        }
      };
    case FETCH_SESSIONS_SUCCESS:
      return {
        ...state,
        all : {
          items: action.payload,
          isFetched: true
        }
      };

    case FETCH_SESSION_SUCCESS: {
      const newState = {
        ...state,
      };
      newState.currentSession.session = action.payload;
      newState.currentSession.isSessionFetched = true;
      return newState;
    }


    case FETCH_SETS_BY_SESSION_REQUEST: {
      const newState = {
        ...state,
      };
      newState.currentSession.setsForSession = [];
      newState.currentSession.isSetsFetched = false;
      return newState;
    }
    case FETCH_SETS_BY_SESSION_SUCCESS: {
      const newState = {
        ...state,
      };
      newState.currentSession.setsForSession = action.payload;
      newState.currentSession.isSetsFetched = true;
      return newState;
    }

    case FETCH_SESSION_REQUEST: {
      const newState = {
        ...state,
      };
      newState.currentSession.isFetched = false;
      return newState;
    }

    //////////////////
    case FETCH_SUBJECTS_BY_SESSION_AND_SET_REQUEST: {
      const newState = {
        ...state,
      };
      newState.currentSession.isSubjectsFetched = false;
      newState.currentSession.subjectsForSet = [];
      return newState;
    }
    case FETCH_SUBJECTS_BY_SESSION_AND_SET_SUCCESS: {
      const newState = {
        ...state,
      };
      newState.currentSession.isSubjectsFetched = true;
      newState.currentSession.subjectsForSet = action.payload;
      return newState;
    }
    ////////////////////////////

    case SHOW_SET: {
      const newState = {
        ...state
      };
      newState.currentSession.isShowSet = true;
      const {idSet} = action.payload;
      newState.currentSession.idCurrentSet = idSet;
      return newState;
    }
    case CLOSE_SET: {
      const newState = {
        ...state
      };
      newState.currentSession.isShowSet = false;
      newState.currentSession.idCurrentSet = '';
      return newState;
    }
    case CHOOSE_SET: {
      const newState = {
        ...state
      };
      newState.currentSession.session.subjectsForSet.subjects = action.payload;
      newState.currentSession.session.subjectsForSet.isFetched = true;
      return newState;
    }


    default:
      return state;
  }
}
