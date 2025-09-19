// Save tokens + user
export const saveAuthData = ({ accessToken, refreshToken, user }) => {
  localStorage.setItem("accessToken", accessToken);
  localStorage.setItem("refreshToken", refreshToken);
  localStorage.setItem("user", JSON.stringify(user)); // store user as JSON
};

// Remove all auth data
export const clearAuthData = () => {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
};

// Load tokens + user
export const loadAuthData = () => {
  const user = localStorage.getItem("user");

  return {
    accessToken: localStorage.getItem("accessToken"),
    refreshToken: localStorage.getItem("refreshToken"),
    user: user ? JSON.parse(user) : null,
  };
};
