// SignupPage.js
import { useCallback, useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import "./auth.css";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { registerAPI } from "../../utils/ApiRequest";
import axios from "axios";

const Register = () => {

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('user')) {
      navigate('/');
    }
  }, [navigate]);

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
  }, []);

  const [values, setValues] = useState({
    name: "",
    email: "",
    password: "",

  });

  const toastOptions = {
    position: "bottom-right",
    autoClose: 2000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: true,
    progress: undefined,
    theme: "dark",
  }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  }

const handleSubmit = async (e) => {
  e.preventDefault();

  const { name, email, password } = values;

  setLoading(true);

  try {
    const { data } = await axios.post(registerAPI, {
      name,
      email,
      password
    });

    if (data.success === true) {
      toast.success(data.message, toastOptions);

      // ✅ redirect to login instead of auto login
      navigate("/login");
    } else {
      toast.error(data.message, toastOptions);
      setLoading(false);
    }
  } catch (error) {
    toast.error("Something went wrong", toastOptions);
    setLoading(false);
  }
};

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
      }}
    >
      {/* Particles Background */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          background: { color: { value: "transparent" } },
          fpsLimit: 60,
          particles: {
            number: { value: 120, density: { enable: true, value_area: 800 } },
            color: { value: "#ffcc00" },
            shape: { type: "circle" },
            opacity: { value: 0.4, random: true },
            size: { value: 3, random: { enable: true, minimumValue: 1 } },
            move: { enable: true, speed: 1.5 },
          },
          detectRetina: true,
        }}
        style={{
          position: "absolute",
          zIndex: 0,
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />

      {/* Register Card */}
      <Container style={{ position: "relative", zIndex: 2 }}>
        <Row className="justify-content-center">
          <Col md={5}>
            <div
              style={{
                padding: "35px",
                borderRadius: "20px",
                background: "rgba(255, 255, 255, 0.08)",
                backdropFilter: "blur(12px)",
                boxShadow: "0 8px 32px rgba(0,0,0,0.3)",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              <h1 className="text-center mb-2">
                <AccountBalanceWalletIcon
                  sx={{ fontSize: 45, color: "#ffcc00" }}
                />
              </h1>

              <h2 className="text-white text-center mb-3">
                Expense Management System
              </h2>

              <h3 className="text-white text-center mb-4">Create Account</h3>

              <Form>
                <Form.Group className="mb-3">
                  <Form.Label className="text-white">Full Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    value={values.name}
                    onChange={handleChange}
                    style={{
                      background: "rgba(255,255,255,0.1)",
                      border: "none",
                      color: "#fff",
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="text-white">Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={values.email}
                    onChange={handleChange}
                    style={{
                      background: "rgba(255,255,255,0.1)",
                      border: "none",
                      color: "#fff",
                    }}
                  />
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label className="text-white">Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Create password"
                    value={values.password}
                    onChange={handleChange}
                    style={{
                      background: "rgba(255,255,255,0.1)",
                      border: "none",
                      color: "#fff",
                    }}
                  />
                </Form.Group>

                <Button
                  type="submit"
                  className="w-100 mt-2"
                  onClick={!loading ? handleSubmit : null}
                  disabled={loading}
                  style={{
                    background: "#ffcc00",
                    border: "none",
                    color: "#000",
                    fontWeight: "bold",
                    borderRadius: "10px",
                    padding: "10px",
                  }}
                >
                  {loading ? "Registering..." : "Sign Up"}
                </Button>

                <p
                  className="text-center mt-3"
                  style={{ color: "#ccc", fontSize: "14px" }}
                >
                  Already have an account?{" "}
                  <Link to="/login" className="text-white">
                    Login
                  </Link>
                </p>
              </Form>
            </div>
          </Col>
        </Row>

        <ToastContainer />
      </Container>
    </div>
  );
}

export default Register