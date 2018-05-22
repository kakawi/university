import { LOCATION_CHANGE } from 'react-router-redux';

export default function operation(state = "", action) {

  // Now there's a LOCATION_CHANGE action we can set the operation
  // from the URL when the history changes (eg first page load, back
  // button etc.)
  if (action.type === LOCATION_CHANGE) {
    const pathname = action.payload.pathname;
    // /redux-history-demo/:operation
    const [_, operation = ""] = pathname.split('/');
    return operation;
  }

  return state;
}
