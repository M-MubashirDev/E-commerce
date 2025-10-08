export function logoutReducer(state) {
  state.user = null;
  state.accessToken = null;
  state.refreshToken = null;
  state.loading = false;
  state.error = null;
}
