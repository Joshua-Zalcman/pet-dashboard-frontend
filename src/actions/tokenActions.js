//check if token is there
export const getToken = () => {
  let token = localStorage.getItem('token');
  if (token) {
    // Check if expired, remove if it is
    const payload = JSON.parse(atob(token.split('.')[1]));
    // JWT's exp is expressed in seconds, not milliseconds, so convert
    if (payload.exp < Date.now() / 1000) {
      localStorage.removeItem('token');
      token = null;
    }
  }
  return token;
};

//get user info from token
export const getUserFromToken = () => {
  const token = getToken();
  if (token) {
    return JSON.parse(atob(token.split('.')[1])).user;
  } else {
    return null;
  }
};

export const removeTokenFromStorage = () => {
  localStorage.removeItem('token');
};

