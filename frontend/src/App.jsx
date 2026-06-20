import { useState, useEffect, useCallback } from "react";
import axios from "axios";
import ContactForm from "./components/ContactForm";
import ContactList from "./components/ContactList";
import ContactPage from "./components/ContactPage";
import "./App.css";

const API_URL = "https://syntecxhub-contact-manager.onrender.com/api/contacts";
const AUTH_URL = "https://syntecxhub-contact-manager.onrender.com/api/auth";

function App() {
  const [currentView, setCurrentView] = useState("manager");
  const [token, setToken] = useState("");
  const [isRegistering, setIsRegistering] = useState(false);
  const [authForm, setAuthForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  // App State
  const [contacts, setContacts] = useState([]);
  const [currentContact, setCurrentContact] = useState(null);
  const [error, setError] = useState("");

  // Attach token to Axios headers automatically
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common["x-auth-token"] = token;
    } else {
      delete axios.defaults.headers.common["x-auth-token"];
    }
  }, [token]);

  const handleLogout = useCallback(() => {
    setToken("");
    setContacts([]);
  }, []);

  const fetchContacts = useCallback(async () => {
    if (!token) return;
    try {
      const response = await axios.get(API_URL);
      setContacts(response.data);
      setError("");
    } catch (err) {
      if (err.response?.status === 401) handleLogout();
      console.error("Error fetching contacts:", err);
    }
  }, [token, handleLogout]);

  useEffect(() => {
    fetchContacts();
  }, [fetchContacts]);

  // --- AUTHENTICATION HANDLER ---
  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    try {
      const endpoint = isRegistering
        ? `${AUTH_URL}/register`
        : `${AUTH_URL}/login`;
      const payload = isRegistering
        ? {
            name: authForm.name,
            email: authForm.email,
            password: authForm.password,
          }
        : { email: authForm.email, password: authForm.password };

      const res = await axios.post(endpoint, payload);
      setToken(res.data.token);
      setAuthForm({ name: "", email: "", password: "" });
      setError("");
    } catch (err) {
      setError(err.response?.data?.message || "Authentication failed");
    }
  };

  const handleAuthChange = (e) => {
    setAuthForm({ ...authForm, [e.target.name]: e.target.value });
  };

  // --- CONTACT HANDLERS ---
  const handleSaveContact = async (contactData) => {
    try {
      if (currentContact) {
        await axios.put(`${API_URL}/${currentContact._id}`, contactData);
      } else {
        await axios.post(API_URL, contactData);
      }
      setCurrentContact(null);
      fetchContacts();
      setError("");
    } catch (err) {
      console.error("Error saving contact:", err);
      setError(err.response?.data?.message || "Error saving contact");
    }
  };

  const handleDeleteContact = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchContacts();
    } catch (err) {
      console.error("Error deleting contact:", err);
      setError("Failed to delete contact.");
    }
  };

  // 1. Show the Public Contact Page
  if (currentView === "contact") {
    return (
      <div
        className="app-container"
        style={{ maxWidth: "1000px", margin: "0 auto" }}
      >
        {/* NEW HEADER DESIGN */}
        <header
          className="header"
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "10px",
            marginTop: "20px",
            marginBottom: "20px",
          }}
        >
          <h1>Contact Us</h1>
          <button
            className="btn btn-secondary"
            onClick={() => setCurrentView("manager")}
            style={{ width: "auto" }}
          >
            Go to Contact Manager App
          </button>
        </header>

        <ContactPage />
      </div>
    );
  }

  // 2. Show Login
  if (!token) {
    return (
      <div
        className="app-container"
        style={{ maxWidth: "400px", margin: "50px auto" }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <button
            className="btn btn-secondary"
            onClick={() => setCurrentView("contact")}
          >
            Back to Contact Us Page
          </button>
        </div>

        <div className="card form-card">
          <h2 style={{ textAlign: "center" }}>
            {isRegistering ? "Create Account" : "Account Login"}
          </h2>
          {error && <div className="error-banner">{error}</div>}

          <form onSubmit={handleAuthSubmit}>
            {isRegistering && (
              <div className="input-group">
                <label>Name</label>
                <input
                  type="text"
                  name="name"
                  value={authForm.name}
                  onChange={handleAuthChange}
                  required
                />
              </div>
            )}
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                name="email"
                value={authForm.email}
                onChange={handleAuthChange}
                required
              />
            </div>
            <div className="input-group">
              <label>Password</label>
              <input
                type="password"
                name="password"
                value={authForm.password}
                onChange={handleAuthChange}
                required
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
              style={{ width: "100%", marginTop: "15px" }}
            >
              {isRegistering ? "Register" : "Login"}
            </button>
          </form>

          <p
            style={{
              textAlign: "center",
              marginTop: "15px",
              cursor: "pointer",
              color: "#85b7ff",
            }}
            onClick={() => setIsRegistering(!isRegistering)}
          >
            {isRegistering
              ? "Already have an account? Login here."
              : "Need an account? Register here."}
          </p>
        </div>
      </div>
    );
  }

  // 3. Show the Secure Contact Manager
  return (
    <div
      className="app-container"
      style={{ maxWidth: "800px", margin: "40px auto" }}
    >
      <header
        className="header"
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "10px",
        }}
      >
        <h1>My Contacts</h1>
        <div style={{ display: "flex", gap: "10px" }}>
          <button
            onClick={() => setCurrentView("contact")}
            className="btn btn-primary"
            style={{ width: "auto" }}
          >
            Contact Us Page
          </button>
          <button
            onClick={handleLogout}
            className="btn btn-secondary"
            style={{ width: "auto" }}
          >
            Log Out
          </button>
        </div>
      </header>

      {error && <div className="error-banner">{error}</div>}

      <div className="main-content">
        <div className="form-section">
          <ContactForm
            onSave={handleSaveContact}
            currentContact={currentContact}
            clearCurrent={() => setCurrentContact(null)}
          />
        </div>
        <div className="list-section">
          <ContactList
            contacts={contacts}
            onEdit={setCurrentContact}
            onDelete={handleDeleteContact}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
