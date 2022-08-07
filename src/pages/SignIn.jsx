/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { Button } from "antd";
import { GoogleOutlined } from "@ant-design/icons";

import { auth, logInWithEmailAndPassword, signInWithGoogle } from "../firebase";
import Card from "../component/Card/Card";
import Forms from "../component/Form/Form";

const SignIn = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  const login = ({ email, password }) => {
    logInWithEmailAndPassword(email, password);
  };

  useEffect(() => {
    if (loading) {
      return;
    }
    if (user) navigate("/");
  }, [user, loading]);

  return (
    <Card title="Sign in" href="/sign-up" hrefName="Sign up" paragraph="Or">
      <Forms onFinish={login} btn="Sign in">
        <Button className="login__btn login__google" onClick={signInWithGoogle}>
          <GoogleOutlined />
          Login with Google
        </Button>
      </Forms>
    </Card>
  );
};

export default SignIn;
