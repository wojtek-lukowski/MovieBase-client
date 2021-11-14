import { combineReducers } from "redux";

import { SET_FILTER, SET_MOVIES, SET_USER, UPDATE_USER, REMOVE_USER } from "../actions/actions";

const visibilityFilter = (state = '', action) => {
    switch (action.type) {
        case SET_FILTER:
          console.log('setFilter reducer reached');
          return action.filterText;
            default:
                return state;
    }
}

const movies = (state = [], action) => {
    switch (action.type) {
      case SET_MOVIES:
        console.log('setMovies reducer reached');
        return action.value;
            default:
                return state;
    }
}

const user = (state = null, action) => {
  switch (action.type) {

    case SET_USER:
      console.log('setUser reducer reached');
      return {
        ...state,
        user: user
      }

case UPDATE_USER:
  console.log('updateUser reducer reached');
  return {
    ...state,
    user: {Username: Username,
    Password: Password,
    Email: Email,
    Birthday: Birthday}
  }

  case REMOVE_USER:
    console.log('removeUser reducer reached');
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