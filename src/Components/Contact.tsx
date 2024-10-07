"use client";
import React, { useState } from "react";

const BlogContact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const contactData = { name, email, message };

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactData),
      });

      if (response.ok) {
        const data = await response.json();
        console.log(data);

        setStatus(data.message);

        setTimeout(() => {
          setStatus("");
        }, 2000);
      } else {
        const errorData = await response.json();
        setStatus(`Error: ${errorData.message}`);

        setTimeout(() => {
          setStatus("");
        }, 2000);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setStatus("Error submitting form.");

      setTimeout(() => {
        setStatus("");
      }, 2000);
    }

    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div className="contact-container">
      <h1>Contact Us</h1>
      <form onSubmit={handleSubmit} className="contact-form">
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="message">Message:</label>
          <textarea
            id="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="submit-button">
          Submit
        </button>
      </form>
      {status && (
        <p
          className={`status-message ${
            status.startsWith("Error") ? "error" : "success"
          }`}
        >
          {status}
        </p>
      )}
    </div>
  );
};

export default BlogContact;
