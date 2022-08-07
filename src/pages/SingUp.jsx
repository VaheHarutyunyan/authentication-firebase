import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../component/Card/Card";
import Forms from "../component/Form/Form";
import { auth, registerWithEmailAndPassword } from "../firebase";
import { useAuthState } from "react-firebase-hooks/auth";

const SignUp = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const register = ({ email, password }) => {
    if (!email || !password) return;
    registerWithEmailAndPassword(email, password);
  };

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/");
  }, [user, loading, navigate]);
  return (
    <Card
      title="Sign Up"
      href="/sign-in"
      hrefName="Sign in"
      paragraph="Alredy an have account"
    >
      <Forms onFinish={register} btn="Sign up" />
    </Card>
  );
};

export default SignUp;
