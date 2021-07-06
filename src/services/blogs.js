import http from "../utils/http";
import config from "../config";
import authHeader from "./auth-header";
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
  console.log(userToken);
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


export async function searchBlog(searchKey) {
  const url = `${api.endpoints.posts}?searchKey=${searchKey}`;
  const response = await http.get(url);

  return response;
}



// /**
//  *Function to edit post
//  *
//  * @export
//  * @param {*} taskId
//  * @param {*} data
//  * @return {*}
//  */
// export async function editTaskById(taskId, data) {
//   const url = `${api.endpoints.todo}/${taskId}`;
//   const response = await http.patch(url, data);

//   return response;
// }

