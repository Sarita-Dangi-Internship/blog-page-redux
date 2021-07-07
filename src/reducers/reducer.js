import * as actions from "../constants/ActionTypes";
import { browserHistory } from "react-router";

const initialState = {
  isSignedIn: false,
  userData: null,
  searchInput: null,
  blogs: [],
  comments: [],
  increment: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case actions.SIGN_IN:
      return { ...state, isSignedIn: true };

    case actions.SIGN_OUT:
      return {
        ...state,
        isSignedIn: false,
      };

    case actions.USER_DATA:
      return { ...state, userData: action.payload };

    case actions.FETCH_BLOGS:
      return { ...state, blogs: action.payload };

    case actions.ADD_NEW_POST:
      return { ...state, blogs: [...state.blogs, action.payload] };
    
    case actions.ADD_NEW_COMMENT:
      return { ...state, blogs: [...state.blogs, action.payload] };

    case actions.UPDATE_POST:
      return { ...state, blogs: [...state.blogs, ...action.payload] };
    
    case actions.DELETE_POST:
      return { ...state };
    
    case actions.INCREMENT:
      return { increment: state.increment + 1 };

    default:
      return state;
  }
};
