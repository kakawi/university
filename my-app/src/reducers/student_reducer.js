const initialState = {
  all: {
    items: [],
    isFetched: null
  },
  currentStudent: {
    student: null,
    isFetched: null
  }
};

export const FETCH_STUDENTS_REQUEST = 'FETCH_STUDENTS_REQUEST';
export const FETCH_STUDENTS_SUCCESS = 'FETCH_STUDENTS_SUCCESS';

export const FETCH_STUDENT_REQUEST = 'FETCH_STUDENT_REQUEST';
export const FETCH_STUDENT_SUCCESS = 'FETCH_STUDENT_SUCCESS';

export const CREATE_STUDENT_REQUEST = 'CREATE_STUDENT_REQUEST';
export const CREATE_STUDENT_SUCCESS = 'CREATE_STUDENT_SUCCESS';

export default function student_reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_STUDENTS_REQUEST:
      return {
        ...state,
        all: {
          items: [...state.all.items],
          isFetched: false
        }
      };
    case FETCH_STUDENTS_SUCCESS:
      return {
        ...state,
        all : {
          items: action.payload,
          isFetched: true
        }
      };

    case FETCH_STUDENT_SUCCESS:
      return {
        ...state,
        currentStudent: {
          student: action.payload,
          isFetched: true
        }
      };
    case FETCH_STUDENT_REQUEST:
      return {
        ...state,
        currentStudent: {
          student: {...state.currentStudent.student},
          isFetched: false
        }
      };
    default:
      return state;
  }
}
