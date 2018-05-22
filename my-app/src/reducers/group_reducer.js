const initialState = {
  all: {
    items: [],
    isFetched: null
  },
  currentGroup: {
    group: null,
    isFetched: null
  }
};

export const FETCH_GROUPS_REQUEST = 'FETCH_GROUPS_REQUEST';
export const FETCH_GROUPS_SUCCESS = 'FETCH_GROUPS_SUCCESS';

export const FETCH_GROUP_REQUEST = 'FETCH_GROUP_REQUEST';
export const FETCH_GROUP_SUCCESS = 'FETCH_GROUP_SUCCESS';

export const CREATE_GROUP_REQUEST = 'CREATE_GROUP_REQUEST';
export const CREATE_GROUP_SUCCESS = 'CREATE_GROUP_SUCCESS';

export default function group_reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_GROUPS_REQUEST:
      return {
        ...state,
        all: {
          items: [...state.all.items],
          isFetched: false
        }
      };
    case FETCH_GROUPS_SUCCESS:
      return {
        ...state,
        all : {
          items: action.payload,
          isFetched: true
        }
      };

    case FETCH_GROUP_SUCCESS:
      return {
        ...state,
        currentGroup: {
          group: action.payload,
          isFetched: true
        }
      };
    case FETCH_GROUP_REQUEST:
      return {
        ...state,
        currentGroup: {
          group: {...state.currentGroup.group},
          isFetched: false
        }
      };
    default:
      return state;
  }
}
