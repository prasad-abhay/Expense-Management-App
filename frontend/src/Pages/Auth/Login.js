// LoginPage.js
import { useCallback, useEffect, useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { loginAPI } from "../../utils/ApiRequest";

const Login = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);

  const [values, setValues] = useState({
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
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const { email, password } = values;
  setLoading(true);

  try {
    const { data } = await axios.post(loginAPI, {
      email,
      password,
    });

    if (data.success === true) {
      localStorage.setItem("user", JSON.stringify(data.user));
      toast.success(data.message, toastOptions);

      navigate("/");
    } else {
      toast.error(data.message, toastOptions);
    }

  } catch (error) {
    if (error.response && error.response.data.message) {
      toast.error(error.response.data.message, toastOptions);
    } else {
      toast.error("Invalid credentials or server error", toastOptions);
    }
  }

  setLoading(false);
};

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
  }, []);

  return (
    <div
      style={{
        position: "relative",
        overflow: "hidden",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
       background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)"
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

      {/* Login Card */}
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
              <h1 className="text-center mb-3">
                <AccountBalanceWalletIcon
                  sx={{ fontSize: 80, color: "#ffcc00" }}
                />
              </h1>

              <h2 className="text-white text-center mb-4">Expense Management System</h2>

              <Form>
                <Form.Group className="mb-3">
                  <Form.Label className="text-white">
                    Email address
                  </Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter email"
                    name="email"
                    onChange={handleChange}
                    value={values.email}
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
                    placeholder="Password"
                    onChange={handleChange}
                    value={values.password}
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
                  {loading ? "Signing in..." : "Login"}
                </Button>

                <p
                  className="text-center mt-3"
                  style={{ color: "#ccc", fontSize: "14px" }}
                >
                  Don't have an account?{" "}
                  <Link to="/register" className="text-white">
                    Register
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
};

export default Login;
