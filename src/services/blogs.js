import http from "../utils/http";
import config from "../config";
import { getAccessToken } from "../utils/token";

const { api } = config;

/**
 *Function to get all blogs
 *
 */
export async function fetchPosts() {
  const url = `${api.endpoints.posts}`;
  const response = await http.get(url);

  return response;
}

/**
 *Function to handle login
 *
 * @export
 * @param {*} data
 * @return {*}
 */
export async function authLogin(token) {
  const url = `${api.endpoints.login}`;
  const response = await http.post(url, token);

  return response;
}

/**
 *Function to create new post
 *
 * @export
 * @param {*} data
 * @return {*}
 */
export async function addNewPost(data) {
  const userToken = getAccessToken();
  const url = `${api.endpoints.posts}`;
  const response = await http.post(url, data, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });

  return response;
}

/**
 *Function to get post by id
 * @export
 * @param {*} postId
 * @return {*}
 */
export async function fetchPostById(postId) {
  const url = `${api.endpoints.posts}/${postId}`;
  const response = await http.get(url);

  return response;
}

/**
 * function to search blogs by title
 * @param {*} searchKey 
 * @returns 
 */
export async function searchBlog(searchKey) {
  const url = `${api.endpoints.posts}?searchKey=${searchKey}`;
  const response = await http.get(url);

  return response;
}

/**
 *Function to edit post
 * @param {*} postId
 * @param {*} data
 */
export async function updatePost(postId, data) {
  const userToken = getAccessToken();

  const url = `${api.endpoints.posts}/${postId}`;
  const response = await http.put(url, data, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
  return response;
}

/**
 *Function to delete post
 */
export async function deletePost(postId) {
  const userToken = getAccessToken();

  const url = `${api.endpoints.posts}/${postId}`;
  const response = await http.delete(url, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });

  return response;
}

/**
 *Function to add new comment
 * @param {*} data
 */
export async function addNewComment(postId,data) {
  const userToken = getAccessToken();
  const url = `${api.endpoints.posts}/${postId}/${api.endpoints.comments}`;
  const response = await http.post(url, data, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });

  return response;
}

/**
 *Function to delete comment
 */
export async function deleteComment(commentId) {
  const userToken = getAccessToken();

  const url = `${api.endpoints.comments}/${commentId}`;
  const response = await http.delete(url, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });

  return response;
}

/**
 *Function to edit comment
 * @param {*} commentId
 * @param {*} data
 */
export async function updateComment(commentId, data) {
  const userToken = getAccessToken();

  const url = `${api.endpoints.comments}/${commentId}`;
  const response = await http.put(url, data, {
    headers: {
      Authorization: `Bearer ${userToken}`,
    },
  });
  return response;
}