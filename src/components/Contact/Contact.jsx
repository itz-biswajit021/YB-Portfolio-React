import React, { useContext, useRef, useState } from "react";
import "./Contact.css";
import emailjs from "@emailjs/browser";
import { themeContext } from "../../Context";

const Contact = () => {
  const theme = useContext(themeContext);
  const darkMode = theme.state.darkMode;
  const form = useRef();
  const [done, setDone] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_wy2s6dk",  // Your EmailJS Service ID
        "template_jyrvaw6", // Your EmailJS Template ID
        form.current,
        "YMJ4drPBKlcG2b4SH" // Your Public Key
      )
      .then(
        (result) => {
          console.log("Email sent successfully:", result.text);
          setDone(true);
          form.current.reset(); // Reset form

          // Hide the message after 3 seconds
          setTimeout(() => {
            setDone(false);
          }, 3000);
        },
        (error) => {
          console.error("Email send error:", error.text);
        }
      );
  };

  return (
    <div className="contact-form" id="contact">
      {/* Left Side */}
      <div className="w-left">
        <div className="awesome">
          <span style={{ color: darkMode ? "white" : "" }}>Get in Touch</span>
          <span>Contact me</span>
          <div className="blur s-blur1" style={{ background: "#ABF1FF94" }}></div>
        </div>
      </div>

      {/* Right Side Form */}
      <div className="c-right">
        <form ref={form} onSubmit={sendEmail}>
          <input type="text" name="user_name" className="user" placeholder="Name" required />
          <input type="email" name="user_email" className="user" placeholder="Email" required />
          <textarea name="message" className="user" placeholder="Message" required />
          <input type="submit" value="Send" className="button" />
        </form>

        {/* Thanks message with 3D effect */}
        {done && (
          <div className="thank-you-box">
            Thanks for contacting me!
          </div>
        )}

        <div className="blur c-blur1" style={{ background: "var(--purple)" }}></div>
      </div>
    </div>
  );
};

export default Contact;
