import React, { useState } from "react";
import { Button, Card, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../context/authContext";
const Dashboard = () => {
  const [err, setErr] = useState("");
  const { currentUser, logOut } = useAuth();
  const history = useHistory();
  const handleLogout = async (e) => {
    setErr("");
    try {
      await logOut();
      history.push("/login");
    } catch (e) {
      setErr(e.message);
    }
  };
  return (
    <>
      <Card>
        <h2 className="text-center mb-4">Profile</h2>
        {err && <Alert variant="danger">{err}</Alert>}
        <strong>Email: </strong> {currentUser?.email}
        <Link to="updateProfile" className="btn btn-primary w-100 mt-3">
          Update Profile
        </Link>
      </Card>
      <div className="w-100 text-center mt-2">
        <Button variant="link" onClick={handleLogout}>
          Log Out
        </Button>
      </div>
    </>
  );
};

export default Dashboard;
