import * as actions from "../constants/ActionTypes";
import * as blogService from "../services/blogs";
import { GET_COMMENTS } from './../constants/ActionTypes';

export const signIn = () => {
  return {
    type: actions.SIGN_IN,
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

export const fetchBlogById = (id) => async (dispatch) => {
  try {
    const response = await blogService.fetchPostById(id);
    dispatch({ type: actions.GET_COMMENTS, payload: response.data.data.comments});
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

export const addNewPost = (title, description, users) => async (dispatch) => {
  try {
    const response = await blogService.addNewPost(title, description, users);
    dispatch({ type: actions.ADD_NEW_POST, payload: response.data.data });

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
};
export const addNewComment = (id,comment) => async (dispatch) => {
  try {
    const response = await blogService.addNewComment(id, comment);
    dispatch({ type: actions.ADD_NEW_COMMENT, payload: response.data.data });

    return Promise.resolve(response.data);
  } catch (error) {
    return Promise.reject(error);
  }
};

export const updatePost = (id, data) => async (dispatch) => {
  try {
    const res = await blogService.updatePost(id, data);

    dispatch({
      type: actions.UPDATE_POST,
      payload: data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};


export const deletePost = (id) => async (dispatch) => {
  try {
    await blogService.deletePost(id);

    dispatch({
      type: actions.DELETE_POST,
      payload: id,
    });
  } catch (err) {
    console.log(err);
  }
};

export const deleteComment = (id) => async (dispatch) => {
  try {
    await blogService.deleteComment(id);

    dispatch({
      type: actions.DELETE_COMMENT,
      payload: id,
    });
  } catch (err) {
    console.log(err);
  }
};

export const updateComment = (id, data) => async (dispatch) => {
  try {
    const res = await blogService.updateComment(id, data);

    dispatch({
      type: actions.UPDATE_COMMENT,
      payload: data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};

export const getProfile = (id) => async (dispatch) => {
  try {
    const response = await blogService.getUserProfile(id);
    dispatch({ type: actions.GET_USER_PROFILE, payload: response.data.data });
  } catch (error) {
    console.log("error");
  }
};

export const updateUserProfile = (id, data) => async (dispatch) => {
  try {
    const res = await blogService.updateUserProfile(id, data);

    dispatch({
      type: actions.UPDATE_USER_PROFILE,
      payload: data,
    });

    return Promise.resolve(res.data);
  } catch (err) {
    return Promise.reject(err);
  }
};