
import React from "react";
import { Link } from "react-router-dom";
import "./signup.css";

const Signup = () => {
  return (
    <>
      <header className="navbar">
        <div className="logo">
          <img src="/Doko Logo.png" alt="Doko Logo" />
        </div>
        <nav>
          <a href="#">Home</a>
          <Link to="/contact">Contact</Link>
          <a href="#">About</a>
          <a href="#" className="active">Sign up</a>
        </nav>
      </header>

      <main className="container">
        <section className="welcome-section">
          <h1>
            Welcome
            <br />
            to doko
          </h1>
          <p>
            Discover the heart of Nepal
            <br />
            through its local treasures.
          </p>
        </section>

        <section className="form-section">
          <h2>Create an account</h2>
          <p>Enter your details below</p>
          <form>
            <input type="text" placeholder="Name" required />
            <input type="email" placeholder="Email or Phone Number" required />
            <input type="password" placeholder="Password" required />
            <button type="submit" className="primary-btn">Create Account</button>
            <button type="button" className="google-btn">
              <img src="/googlelogo.png" alt="g" />
              Sign up with Google
            </button>
            <p className="login-text">
              Already have an account?{" "}
              <Link to="/my-account">
                <u>My Account</u>
              </Link>
            </p>
          </form>
        </section>
      </main>

      <footer className="footer">
        <div className="footer-section">
          <h4>DOKO</h4>
          <p>Subscribe</p>
          <p>Get 10% off your first order</p>
          <input type="email" placeholder="Enter your email" />
        </div>

        <div className="footer-section">
          <h4>Support</h4>
          <p>111 Kathmandu,<br />+977 Nepal</p>
          <p>edu4nepal@gmail.com</p>
          <p>+977 9823456789</p>
        </div>

        <div className="footer-section">
          <h4>Account</h4>
          <Link to="/my-account">My Account</Link><br /><br />
          <a href="#">Cart</a><br /><br />
          <a href="#">Wishlist</a><br /><br />
          <a href="#">Shop</a>
        </div>

        <div className="footer-section">
          <h4>Quick Link</h4>
          <a href="#">Privacy Policy</a><br /><br />
          <a href="#">Terms of Use</a><br /><br />
          <a href="#">FAQ</a><br /><br />
          <Link to="/contact">Contact</Link>
        </div>
      </footer>
    </>
  );
};

export default Signup;
