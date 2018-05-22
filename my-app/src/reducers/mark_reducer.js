const initialState = {
  all: {
    items: [],
    isFetched: null
  },
  currentMark: {
    mark: null,
    isFetched: null
  },
  form: {
    allSessions: [],
    isFetchingSession: false,
    students: [],
    isFetchingStudents: false,
    subjects: [],
    isFetchingSubjects: false
  }
};

export const FETCH_MARKS_REQUEST = 'FETCH_MARKS_REQUEST';
export const FETCH_MARKS_SUCCESS = 'FETCH_MARKS_SUCCESS';

export const FETCH_MARK_REQUEST = 'FETCH_MARK_REQUEST';
export const FETCH_MARK_SUCCESS = 'FETCH_MARK_SUCCESS';

export const CREATE_MARK_REQUEST = 'CREATE_MARK_REQUEST';
export const CREATE_MARK_SUCCESS = 'CREATE_MARK_SUCCESS';

export const DELETE_MARK_SUCCESS = 'DELETE_MARK_SUCCESS';

export const FETCH_SESSIONS_FOR_MARK_REQUEST = 'FETCH_SESSIONS_FOR_MARK_REQUEST';
export const FETCH_SESSIONS_FOR_MARK_SUCCESS = 'FETCH_SESSIONS_FOR_MARK_SUCCESS';
export const FETCH_STUDENTS_BY_SESSION_REQUEST = 'FETCH_STUDENTS_BY_SESSION_REQUEST';
export const FETCH_STUDENTS_BY_SESSION_SUCCESS = 'FETCH_STUDENTS_BY_SESSION_AND_STUDENT_SUCCESS';
export const FETCH_SUBJECTS_BY_SESSION_AND_STUDENT_REQUEST = 'FETCH_SUBJECTS_BY_SESSION_AND_STUDENT_REQUEST';
export const FETCH_SUBJECTS_BY_SESSION_AND_STUDENT_SUCCESS = 'FETCH_SUBJECTS_BY_SESSION_AND_STUDENT_SUCCESS';

export default function mark_reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_MARKS_REQUEST:
      return {
        ...state,
        all: {
          items: [...state.all.items],
          isFetched: false
        }
      };
    case FETCH_MARKS_SUCCESS:
      return {
        ...state,
        all : {
          items: action.payload,
          isFetched: true
        }
      };

    case FETCH_MARK_SUCCESS:
      return {
        ...state,
        currentMark: {
          mark: action.payload,
          isFetched: true
        }
      };
    case FETCH_MARK_REQUEST:
      return {
        ...state,
        currentMark: {
          mark: {...state.currentMark.mark},
          isFetched: false
        }
      };

    case FETCH_SESSIONS_FOR_MARK_REQUEST: {
      const newState = {
        ...state
      };
      newState.form.allSessions = [];
      newState.form.isFetchingSession = true;
      return newState;
    }
    case FETCH_SESSIONS_FOR_MARK_SUCCESS: {
      const newState = {
        ...state
      };
      newState.form.allSessions = action.payload;
      newState.form.isFetchingSession = false;
      return newState;
    }
    case FETCH_STUDENTS_BY_SESSION_REQUEST: {
      const newState = {
        ...state
      };
      newState.form.students = [];
      newState.form.isFetchingStudents = true;
      return newState;
    }
    case FETCH_STUDENTS_BY_SESSION_SUCCESS: {
      const newState = {
        ...state
      };
      newState.form.students = action.payload;
      newState.form.isFetchingStudents = false;
      return newState;
    }
    case FETCH_SUBJECTS_BY_SESSION_AND_STUDENT_REQUEST: {
      const newState = {
        ...state
      };
      newState.form.subjects = [];
      newState.form.isFetchingSubjects = true;
      return newState;
    }
    case FETCH_SUBJECTS_BY_SESSION_AND_STUDENT_SUCCESS: {
      const newState = {
        ...state
      };
      newState.form.subjects = action.payload;
      newState.form.isFetchingSubjects = false;
      return newState;
    }

    case DELETE_MARK_SUCCESS: {
      const markId = action.payload.id;
      const newState = {
        ...state
      };
      newState.all.items = state.all.items.filter(mark => mark.id !== markId);
      return newState;
    }
    default:
      return state;
  }
}
