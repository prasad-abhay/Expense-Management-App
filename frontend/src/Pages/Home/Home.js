import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import { Button, Modal, Form, Container } from "react-bootstrap";
import "./home.css";
import { addTransaction, getTransactions } from "../../utils/ApiRequest";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Spinner from "../../components/Spinner";
import TableData from "./TableData";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import BarChartIcon from "@mui/icons-material/BarChart";
import Analytics from "./Analytics";

const Home = () => {
  const navigate = useNavigate();

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
  const [cUser, setcUser] = useState();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [frequency, setFrequency] = useState("30");
  const [type, setType] = useState("all");
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [view, setView] = useState("table");

  const handleStartChange = (date) => {
    setStartDate(date);
  };

  const handleEndChange = (date) => {
    setEndDate(date);
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    const user = localStorage.getItem("user");

    if (!user) {
      navigate("/login");
    } else {
      const parsedUser = JSON.parse(user);
      setcUser(parsedUser);
      setRefresh(true);
    }
  }, [navigate]);
  const [values, setValues] = useState({
    title: "",
    amount: "",
    description: "",
    category: "",
    date: "",
    transactionType: "",
  });

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleChangeFrequency = (e) => {
    setFrequency(e.target.value);
  };

  const handleSetType = (e) => {
    setType(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { title, amount, description, category, date, transactionType } =
      values;

    if (
      !title ||
      !amount ||
      !description ||
      !category ||
      !date ||
      !transactionType
    ) {
      toast.error("Please enter all the fields", toastOptions);
    }
    setLoading(true);

    const { data } = await axios.post(addTransaction, {
      title: title,
      amount: amount,
      description: description,
      category: category,
      date: date,
      transactionType: transactionType,
      userId: cUser._id,
    });

    if (data.success === true) {
      toast.success(data.message, toastOptions);
      handleClose();
      setRefresh(!refresh);
    } else {
      toast.error(data.message, toastOptions);
    }

    setLoading(false);
  };

  const handleReset = () => {
    setType("all");
    setStartDate(null);
    setEndDate(null);
    setFrequency("7");
  };

  useEffect(() => {
    if (!cUser) return;

    const fetchAllTransactions = async () => {
      try {
        setLoading(true);

        const { data } = await axios.post(getTransactions, {
          userId: cUser._id,
          frequency,
          startDate,
          endDate,
          type,
        });

        setTransactions(data.transactions);
        setLoading(false);
      } catch (err) {
        toast.error("Error please Try again...", toastOptions);
        setLoading(false);
      }
    };

    fetchAllTransactions();
  }, [refresh, frequency, endDate, type, startDate, cUser]);

  const handleTableClick = (e) => {
    setView("table");
  };

  const handleChartClick = (e) => {
    setView("chart");
  };

  return (
    <>
      <Header />

      {loading ? (
        <Spinner />
      ) : (
        <div
          style={{
            minHeight: "100vh",
            background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
            paddingBottom: "30px",
          }}
        >
          <Container style={{ position: "relative", zIndex: 2 }} className="pt-4">

            <div
              style={{
                textAlign: "center",
                marginBottom: "25px",
              }}
            >
              <h1
                style={{
                  color: "#ffffff",
                  fontWeight: "700",
                  letterSpacing: "1px",
                  marginBottom: "5px",
                }}
              >
                Expense Management System
              </h1>
            </div>

            {/* 🔷 FILTER BAR */}
            <div
              style={{
                background: "rgba(255,255,255,0.08)",
                backdropFilter: "blur(10px)",
                borderRadius: "15px",
                padding: "20px",
                marginBottom: "20px",
                display: "flex",
                flexWrap: "wrap",
                gap: "20px",
                alignItems: "center",
                justifyContent: "space-between",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              {/* Frequency */}
              <Form.Group style={{ minWidth: "150px" }}>
                <Form.Label className="text-white">Frequency</Form.Label>
                <Form.Select
                  name="frequency"
                  value={frequency}
                  onChange={handleChangeFrequency}
                >
                  <option value="7">Last Week</option>
                  <option value="30">Last Month</option>
                  <option value="365">Last Year</option>
                  <option value="custom">Custom</option>
                </Form.Select>
              </Form.Group>

              {/* Type */}
              <Form.Group style={{ minWidth: "150px" }}>
                <Form.Label className="text-white">Type</Form.Label>
                <Form.Select
                  name="type"
                  value={type}
                  onChange={handleSetType}
                >
                  <option value="all">All</option>
                  <option value="expense">Expense</option>
                  <option value="credit">Earned</option>
                </Form.Select>
              </Form.Group>

              {/* View Toggle */}
              <div style={{ display: "flex", gap: "15px" }}>
                <FormatListBulletedIcon
                  onClick={handleTableClick}
                  sx={{
                    cursor: "pointer",
                    color: view === "table" ? "#ffcc00" : "#ccc",
                    fontSize: 30,
                  }}
                />
                <BarChartIcon
                  onClick={handleChartClick}
                  sx={{
                    cursor: "pointer",
                    color: view === "chart" ? "#ffcc00" : "#ccc",
                    fontSize: 30,
                  }}
                />
              </div>

              {/* Add Button */}
              <Button
                onClick={handleShow}
                style={{
                  background: "#ffcc00",
                  border: "none",
                  color: "#000",
                  fontWeight: "bold",
                  borderRadius: "10px",
                  padding: "8px 16px",
                }}
              >
                + Add New
              </Button>
            </div>

            {/* 🔷 CUSTOM DATE */}
            {frequency === "custom" && (
              <div
                style={{
                  display: "flex",
                  gap: "20px",
                  marginBottom: "20px",
                  flexWrap: "wrap",
                }}
              >
                <div>
                  <label className="text-white">Start Date</label>
                  <DatePicker
                    selected={startDate}
                    onChange={handleStartChange}
                    selectsStart
                    startDate={startDate}
                    endDate={endDate}
                  />
                </div>

                <div>
                  <label className="text-white">End Date</label>
                  <DatePicker
                    selected={endDate}
                    onChange={handleEndChange}
                    selectsEnd
                    startDate={startDate}
                    endDate={endDate}
                    minDate={startDate}
                  />
                </div>
              </div>
            )}

            {/* 🔷 RESET BUTTON */}
            <div style={{ marginBottom: "20px" }}>
              <Button variant="outline-light" onClick={handleReset}>
                Reset Filter
              </Button>
            </div>

            {/* 🔷 DATA VIEW */}
            <div
              style={{
                background: "rgba(255,255,255,0.08)",
                backdropFilter: "blur(10px)",
                borderRadius: "15px",
                padding: "20px",
                border: "1px solid rgba(255,255,255,0.1)",
              }}
            >
              {view === "table" ? (
                <TableData data={transactions} user={cUser} />
              ) : (
                <Analytics transactions={transactions} user={cUser} />
              )}
            </div>

            {/* 🔷 MODAL */}
            <Modal show={show} onHide={handleClose} centered>
              <Modal.Header closeButton>
                <Modal.Title>Add Transaction</Modal.Title>
              </Modal.Header>

              <Modal.Body>
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      name="title"
                      type="text"
                      placeholder="Enter Transaction Name"
                      value={values.title}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Amount</Form.Label>
                    <Form.Control
                      name="amount"
                      type="number"
                      placeholder="Enter Amount"
                      value={values.amount}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Select
                      name="category"
                      value={values.category}
                      onChange={handleChange}
                    >
                      <option value="">Choose...</option>
                      <option value="Groceries">Groceries</option>
                      <option value="Rent">Rent</option>
                      <option value="Salary">Salary</option>
                      <option value="Food">Food</option>
                      <option value="Medical">Medical</option>
                      <option value="Utilities">Utilities</option>
                      <option value="Entertainment">Entertainment</option>
                      <option value="Transportation">Transportation</option>
                      <option value="Other">Other</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      type="text"
                      name="description"
                      placeholder="Enter Description"
                      value={values.description}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Transaction Type</Form.Label>
                    <Form.Select
                      name="transactionType"
                      value={values.transactionType}
                      onChange={handleChange}
                    >
                      <option value="">Choose...</option>
                      <option value="credit">Credit</option>
                      <option value="expense">Expense</option>
                    </Form.Select>
                  </Form.Group>

                  <Form.Group className="mb-3">
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                      type="date"
                      name="date"
                      value={values.date}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Form>
              </Modal.Body>

              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                  Submit
                </Button>
              </Modal.Footer>
            </Modal>

            <ToastContainer />
          </Container>
        </div>
      )}
    </>
  );
};

export default Home;