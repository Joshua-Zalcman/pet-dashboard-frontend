export default (state, action) => {
  switch (action.type) {
    case "LOGIN_USER":
      return {
        userInfo: action.payload
      };
    case "CHECK_FOR_USER":
      return {
        userInfo: action.payload
      };
    case "LOGOUT_USER":
      return {
        userInfo: action.payload
      };
    default:
      return state;
  }
}