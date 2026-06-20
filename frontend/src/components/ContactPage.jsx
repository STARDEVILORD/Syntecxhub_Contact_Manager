import { useState } from "react";
import phoneIcon from "../assets/Call.png";
import emailIcon from "../assets/gmail.png";
import locationIcon from "../assets/Location.png";
import axios from "axios";
import "./ContactPage.css";

const MESSAGES_API_URL = "https://syntecxhub-contact-manager.onrender.com/api/messages";

function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [copiedItem, setCopiedItem] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");
    try {
      await axios.post(MESSAGES_API_URL, formData);
      setStatus("Message Sent Successfully!");
      setFormData({ name: "", email: "", phone: "", message: "" });
      setTimeout(() => setStatus(""), 3000);
    } catch (err) {
      console.error("Failed to send message:", err);
      setStatus("Failed to send message. Please try again.");
    }
  };

  // NEW: Function to copy text to clipboard
  const handleCopy = (text, itemType) => {
    navigator.clipboard.writeText(text);
    setCopiedItem(itemType); 


    setTimeout(() => {
      setCopiedItem("");
    }, 2000);
  };

  return (
    <div className="contact-page-container">
      {/* Info Cards Section */}
      <div className="contact-info-section">
        {/* Phone Card - Clickable */}
        <div
          className="info-card clickable-card"
          onClick={() => handleCopy("+91 12345 78944", "phone")}
        >
          <div className="info-icon">
            <img
              src={phoneIcon}
              alt="Phone"
              style={{ width: "50px", height: "50px" }}
            />
          </div>
          <div className="info-content">
            <h4>Phone</h4>
            <p>+91 12345 78944</p>
            {copiedItem === "phone" && (
              <span className="copy-badge">Copied!</span>
            )}
          </div>
        </div>

        {/* Email Card - Clickable */}
        <div
          className="info-card clickable-card"
          onClick={() => handleCopy("shriram@gmail.com", "email")}
        >
          <img
            src={emailIcon}
            alt="Email"
            style={{ width: "40px", height: "40px" }}
          />
          <div className="info-content">
            <h4>Email</h4>
            <p>shriram@gmail.com</p>
            {copiedItem === "email" && (
              <span className="copy-badge">Copied!</span>
            )}
          </div>
        </div>

        {/* Address Card - Clickable */}
        <div
          className="info-card clickable-card"
          onClick={() => handleCopy("Mahad, MH, India", "address")}
        >
          <img
            src={locationIcon}
            alt="Location"
            style={{ width: "50px", height: "50px" }}
          />
          <div className="info-content">
            <h4>Address</h4>
            <p>Mahad, MH, India</p>
            {copiedItem === "address" && (
              <span className="copy-badge">Copied!</span>
            )}
          </div>
        </div>
      </div>

      {/* Main Form Section */}
      <div className="contact-form-card">
        <h2>Get in Touch</h2>

        {status && (
          <div
            style={{
              marginBottom: "15px",
              padding: "10px",
              backgroundColor: status.includes("Failed")
                ? "#ffcccc"
                : "#d4edda",
              color: status.includes("Failed") ? "#cc0000" : "#155724",
              borderRadius: "4px",
              textAlign: "center",
            }}
          >
            {status}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="text"
              name="phone"
              placeholder="Your Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-row">
            <textarea
              name="message"
              placeholder="Message"
              rows="6"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          <button type="submit" className="submit-btn">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}

export default ContactPage;
