import * as actions from "../constants/ActionTypes";
import * as blogService from "../services/blogs";

export const signIn = () => {
  return {
    type: actions.SIGN_IN,
    // payload: id,
  };
};

export const signOut = () => {
  return {
    type: actions.SIGN_OUT,
  };
};

export const updateUserData = (userData) => {
  return {
    type: actions.USER_DATA,
    payload: {
      name: userData.name,
      email: userData.email,
      image: userData.image,
      id: userData.id,
    },
  };
};

export const fetchBlogs = () => async (dispatch) => {
  try {
    const response = await blogService.fetchPosts();
    dispatch({ type: actions.FETCH_BLOGS, payload: response.data.data });
  } catch (error) {
    console.log("error");
  }
};

export const searchBlog = (searchKey) => async (dispatch) => {
  try {
    const response = await blogService.searchBlog(searchKey);
    dispatch({ type: actions.FETCH_BLOGS, payload: response.data.data });
  } catch (error) {
    console.log(error);
  }
};

export const increment = () => {
  return {
    type: actions.INCREMENT,
  };
};
