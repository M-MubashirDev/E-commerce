import { useSelector } from "react-redux";

function useAuthAdminToken() {
  const { accessToken } = useSelector((state) => state.adminAuth);
  return accessToken;
}

export default useAuthAdminToken;
