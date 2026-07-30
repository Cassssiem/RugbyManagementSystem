import React, { useState } from "react";
import "../styles/SponsorView.css";

const SponsorView = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("Sponsor Inquiry:", formData);

    // Add API call here
    // await axios.post("/api/sponsors", formData)
  };

  return (
    <div className="sponsor-page">
      <section className="sponsor-hero">

        <div className="sponsor-content">
          <h1>
            POWER THE <span>PITCH</span>
          </h1>

          <p>
            Partner with Titans and position your brand at the heart of
            high-performance rugby management. Reach thousands of players,
            coaches, and passionate fans.
          </p>
        </div>


        <div className="sponsor-card">
          <h2>Become a Sponsor</h2>

          <p className="subtitle">
            Fill out the form below to receive our sponsorship package details.
          </p>


          <form onSubmit={handleSubmit}>

            <label>Full Name</label>
            <input
              type="text"
              name="name"
              placeholder="Jane Doe"
              value={formData.name}
              onChange={handleChange}
            />


            <label>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="jane@company.com"
              value={formData.email}
              onChange={handleChange}
            />


            <label>Phone Number (Optional)</label>
            <input
              type="text"
              name="phone"
              placeholder="+1 (555) 000-0000"
              value={formData.phone}
              onChange={handleChange}
            />


            <label>Message</label>
            <textarea
              name="message"
              placeholder="Tell us about your brand and sponsorship goals..."
              value={formData.message}
              onChange={handleChange}
            />


            <button type="submit">
              SUBMIT INQUIRY ➤
            </button>

          </form>
        </div>

      </section>
    </div>
  );
};

export default SponsorView;