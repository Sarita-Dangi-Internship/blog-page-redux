export const setUserImage = (image) => {
  window.localStorage.setItem("image", image);
};

export const setUserName = (name) => {
  window.localStorage.setItem("name", name);
};

export const setUserId = (id) => {
  window.localStorage.setItem("id", id);
};

export const setUserEmail = (email) => {
  window.localStorage.setItem("email", email);
};

export const getUserImage = () => {
  return window.localStorage.getItem("image");
};

export const getUserName = () => {
  return window.localStorage.getItem("name");
};
export const getUserId = () => {
  return window.localStorage.getItem("id");
};
export const getUserEmail = () => {
  return window.localStorage.getItem("email");
};

export const deleteUserImage = () => {
  window.localStorage.removeItem("image");
};

export const deleteUserName = () => {
  window.localStorage.removeItem("name");
};
