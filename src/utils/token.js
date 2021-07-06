
export const setAccessToken = (token) => {

  window.localStorage.setItem("accessToken", token);
}

export const getAccessToken = () => {

  return window.localStorage.getItem("accessToken");
}

export const deleteAccessToken = () => {

  window.localStorage.removeItem("accessToken");
}

