import { store } from "../store";

export const getAuthAdminToken = () => {
  const state = store.getState();
  const adminToken = state.adminAuth?.accessToken;

  return adminToken;
};
export function getAuthToken() {
  const state = store.getState();
  const token = state.auth?.accessToken;
  return token;
}
