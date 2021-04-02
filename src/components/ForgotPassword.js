import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useAuth } from "../context/authContext";

const ForgotPassword = () => {
  const emailRef = useRef();
  const { resetPassword } = useAuth();

  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setErr("");
      setMsg("");
      setLoading(true);
      await resetPassword(emailRef.current.value);
      setMsg("Check your mail for further instructions!!");
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
          {msg && <Alert variant="primary">{msg}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group id="email">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" ref={emailRef} required />
            </Form.Group>

            <Button disabled={loading} className="w-100" type="submit">
              Reset Password
            </Button>
          </Form>
        </Card.Body>
      </Card>
      <div className="w-100 text-center mt-3">
        Remember your password<Link to="/login"> Log in </Link>
      </div>
      <div className="w-100 text-center mt-2">
        Do not have an account?
        <Link to="/signup"> Sign Up</Link>
      </div>
    </>
  );
};
export default ForgotPassword;
