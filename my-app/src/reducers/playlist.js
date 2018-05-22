const initialState = [
  'My home playlist',
  'My work playlist'
];

export default function playlist_reducer(state = initialState, action) {
  switch (action.type) {
    case 'ADD_PLAYLIST':
      return [
        ...state,
        action.payload
      ];
    default:
      return state;
  }
}