const initialState = {
  all: [],
  currentDepartment: {
    department: [],
    isFetched: null
  }
};

export const FETCH_DEPARTMENT_REQUEST = 'FETCH_DEPARTMENT_REQUEST';

export const FETCH_DEPARTMENTS_SUCCESS = 'FETCH_DEPARTMENTS_SUCCESS';
export const FETCH_DEPARTMENT_SUCCESS = 'FETCH_DEPARTMENT_SUCCESS';

export default function faculty_reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_DEPARTMENTS_SUCCESS:
      return {
        ...state,
        all : action.payload
      };
    case FETCH_DEPARTMENT_SUCCESS:
      return {
        ...state,
        currentDepartment: {
          department: action.payload,
          isFetched: true
        }
      };

    case FETCH_DEPARTMENT_REQUEST:
      return {
        ...state,
        currentDepartment: {
          department: [...state.currentDepartment.department],
          isFetched: false
        }
      };
    default:
      return state;
  }
}
