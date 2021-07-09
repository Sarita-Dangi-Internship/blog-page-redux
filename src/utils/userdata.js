export const setUserImage = (image) => {
  window.localStorage.setItem("image", image);
};

export const setUserName = (name) => {
  window.localStorage.setItem("name", name);
};

export const getUserImage = () => {
  return window.localStorage.getItem("image");
};

export const getUserName = () => {
  return window.localStorage.getItem("name");
};

export const deleteUserImage = () => {
  window.localStorage.removeItem("image");
};

export const deleteUserName = () => {
  window.localStorage.removeItem("name");
};
