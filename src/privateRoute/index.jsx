import { useMemo } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Navigate } from "react-router-dom";
import Loader from "../component/Loader/Loader";

import { auth } from "../firebase";

const PrivateRoute = ({ children }) => {
  const [user, loading] = useAuthState(auth);

  const render = useMemo(() => {
    if (loading) {
      return <Loader />;
    }
    return user?.accessToken ? (
      <>{children}</>
    ) : (
      <Navigate to="/sign-in" replace />
    );
  }, [loading, user, children]);

  return render;
};

export default PrivateRoute;
