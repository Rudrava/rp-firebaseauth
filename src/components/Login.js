import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { useAuth } from "../context/authContext";

const Login = () => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { logIn } = useAuth();
  const history = useHistory();

  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("here", emailRef.current.value, passwordRef.current.value);
      setErr("");
      setLoading(true);
      await logIn(emailRef.current.value, passwordRef.current.value);
      history.push("/");
    } catch (e) {
      setErr(e.message);
    }
    setLoading(false);
  };
  return (
    <>
      <Card>
        <Card.Body>
          <h2 className="text-center mb-4">Log In</h2>
          {err && <Alert variant="danger">{err}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>
            <Form.Group id="password">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" ref={passwordRef} required />
            </Form.Group>

            <Button disabled={loading} className="w-100" type="submit">
              LogIn
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-2">
        Do not have an account?
        <Link to="/signup"> Sign Up</Link>
      </div>
      <div className="w-100 text-center mt-3">
        <Link to="/forgotPassword">Forgot Password? </Link>
      </div>
    </>
  );
};
export default Login;
