const initialState = {
  all: [],
  currentFaculty: {
    speciality: [],
    isFetched: null
  }
};

export const FETCH_FACULTIES_SUCCESS = 'FETCH_FACULTIES_SUCCESS';
export const FETCH_FACULTY_SUCCESS = 'FETCH_FACULTY_SUCCESS';
export const FETCH_FACULTY_CLOSE = 'FETCH_FACULTY_CLOSE';

export const FETCH_FACULTY_REQUEST = 'FETCH_FACULTY_REQUEST';

export const UPDATE_FACULTY = 'UPDATE_FACULTY';

export default function faculty_reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_FACULTIES_SUCCESS:
      return {
        ...state,
        all : action.payload
      };
    case UPDATE_FACULTY: {
      const newState = {
        ...state,
      };
      newState.all = newState.all.map(faculty => {
        if (faculty.id === action.payload.id) {
          return action.payload;
        }
        return faculty;
      });

      return newState;
    }
    case FETCH_FACULTY_SUCCESS:
      const faculty = action.payload;
      faculty.departments.forEach(department => {
        department.faculty = faculty;
      });
      return {
        ...state,
        currentFaculty: {
          faculty: faculty,
          isFetched: true
        }
      };

    case FETCH_FACULTY_CLOSE:
      return {
        ...state,
        currentFaculty: null
      };

    case FETCH_FACULTY_REQUEST:
      const newState = {
        ...state
      };
      newState.currentFaculty.isFetched = false;
      return newState;
    default:
      return state;
  }
}
