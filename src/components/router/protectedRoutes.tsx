import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store"; // Adjust based on your Redux store setup
import { Storages } from "@/lib/helpers";
import { StorageKeysEnum, UserAuthInfoInt } from "@/types";
const ProtectedRoute = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  // Check Redux state first, then localStorage
  const storedUser = Storages.getStorage('local',StorageKeysEnum.user)// Replace "user" with your localStorage key
  const isUserAuthenticated = user?.isVerified || (storedUser as UserAuthInfoInt)?.isVerified;

  // Redirect to login if no authenticated user is found
  if (!isUserAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // If authenticated, render the protected routes
  return <Outlet />;
};

export default ProtectedRoute;
