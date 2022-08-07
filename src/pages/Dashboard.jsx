/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Button, PageHeader } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { auth, logout } from "../firebase";
import { DndBoard } from "./DndBoard/DndBoard";

const Dashboard = () => {
  const [user, loading] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
  }, [user, loading]);

  return (
    <div className="site-page-header-ghost-wrapper">
      <PageHeader
        ghost={true}
        title="Dashboard"
        subTitle={user.email}
        extra={
          <Button type="none" key={"logout"} onClick={logout}>
            <LogoutOutlined />
            Logout
          </Button>
        }
      ></PageHeader>
      <div>
        <DndBoard />
      </div>
    </div>
  );
};

export default Dashboard;
