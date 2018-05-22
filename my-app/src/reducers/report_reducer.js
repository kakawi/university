const initialState = {
  session: {},
  name: null,
  data: [],
  isFetchingReport: false
};

export const CHANGE_SESSION = 'CHANGE_SESSION';
export const FETCH_REPORT_REQUEST = 'FETCH_REPORT_REQUEST';
export const FETCH_REPORT_SUCCESS = 'FETCH_REPORT_SUCCESS';


export default function subject_reducer(state = initialState, action) {
  switch (action.type) {
    case CHANGE_SESSION:
      return Object.assign({}, state, {
        session: action.payload,
        data: []
      });
    case FETCH_REPORT_REQUEST:
      return {
        ...state,
        name: 'dontPassStudents',
        isFetchingReport: true,
        data: []
      };
    case FETCH_REPORT_SUCCESS:
      return {
        ...state,
        isFetchingReport: false,
        data: action.payload
      };

    default:
      return state;
  }
}
