import { combineReducers } from "redux";

import { SET_FILTER, SET_MOVIES, SET_USER, UPDATE_USER, REMOVE_USER } from "../actions/actions";

const visibilityFilter = (state = '', action) => {
    switch (action.type) {
        case SET_FILTER:
          return action.filterText;
            default:
                return state;
    }
}

const movies = (state = [], action) => {
    switch (action.type) {
      case SET_MOVIES:
        return action.value;
            default:
                return state;
    }
}

const user = (state = null, action) => {
  switch (action.type) {

    case SET_USER:
      return {
        ...state,
        user: user
      }

case UPDATE_USER:
  return {
    ...state,
    user: {Username: Username,
    Password: Password,
    Email: Email,
    Birthday: Birthday}
  }

  case REMOVE_USER:
    return state.splice((user, username) => (
      username === action.username)
      (alert(`${user} has been removed.`))
  )

      default:
        return state;
  }
}

const moviesApp = combineReducers({
  visibilityFilter,
  movies,
  user
});

export default moviesApp;