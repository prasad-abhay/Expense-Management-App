// NavbarComponent.js
import React, { useCallback, useEffect, useState } from 'react';
import { Navbar, Nav, Button } from 'react-bootstrap';
import "./style.css";
import { useNavigate } from 'react-router-dom';
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
const Header = () => {

  const navigate = useNavigate();

  const handleShowLogin = () => {
    navigate("/login");
  }

  const [user, setUser] = useState();

  useEffect(() => {

    if (localStorage.getItem("user")) {
      const user = JSON.parse(localStorage.getItem("user"));

      setUser(user);

    }
  }, []);

  const handleShowLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  }

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container) => {
  }, []);

  return (
    <>
      <div style={{

        position: "relative",

        overflow: "hidden",

        minHeight: "5vh",

        background: "linear-gradient(90deg, #0f2027, #203a43, #2c5364)"

      }}>
        <Particles
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={{
            background: {
              color: {
                value: "transparent",
              },
            },
            fpsLimit: 60,
            particles: {
              number: {
                value: 200,
                density: {
                  enable: true,
                  value_area: 800,
                },
              },
              color: {
                value: '#ffcc00',
              },
              shape: {
                type: 'circle',
              },
              opacity: {
                value: 0.5,
                random: true,
              },
              size: {
                value: 3,
                random: { enable: true, minimumValue: 1 },
              },
              links: {
                enable: false,
              },
              move: {
                enable: true,
                speed: 2,
              },
              life: {
                duration: {
                  sync: false,
                  value: 3,
                },
                count: 0,
                delay: {
                  random: {
                    enable: true,
                    minimumValue: 0.5,
                  },
                  value: 1,
                },
              },
            },
            detectRetina: true,
          }}
          style={{
            position: 'absolute',
            zIndex: 0,
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
          }}
        />
        <Navbar
          className="navbarCSS"
          expand="lg"
          style={{ position: "relative", zIndex: 2 }}
        >
          {/* LEFT: Welcome User */}
          <Navbar.Brand className="text-white fw-bold">
            Welcome,{" "}
            <span style={{ color: "#ffcc00" }}>
              {user?.name || user?.email}
            </span>
          </Navbar.Brand>

          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            style={{ backgroundColor: "transparent", borderColor: "transparent" }}
          >
            <span
              className="navbar-toggler-icon"
              style={{
                background: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(255, 255, 255)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e")`,
              }}
            ></span>
          </Navbar.Toggle>

          {/* RIGHT: Logout */}
          <Navbar.Collapse className="justify-content-end">
            {user && (
              <Button
                variant="warning"
                onClick={handleShowLogout}
                style={{
                  fontWeight: "600",
                  borderRadius: "8px",
                }}
              >
                Logout
              </Button>
            )}
          </Navbar.Collapse>
        </Navbar>
      </div>
    </>
  );
};

export default Header;
