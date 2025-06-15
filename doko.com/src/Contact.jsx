import React from "react";
import { Link } from "react-router-dom";

const Contact = () => {
  return (
    <div className="bg-white">
      <header className="fixed top-0 left-0 w-full z-50 bg-white">
        <div className="bg-black text-white text-center text-sm py-2">
          <span>Sign up and get 20% off to your first order. </span>
          <Link to="/" className="underline">Sign Up Now</Link>
        </div>

        <nav className="flex items-center justify-between py-4 px-6 pt-0 border pb-0">
          <div>
            <img src="images/Doko Logo.png" alt="Logo" className="h-20 w-20" />
          </div>

          <ul className="hidden md:flex items-center gap-7 text-gray-700 font-medium">
            <li>
              <Link to="/" className="hover:text-black">Home</Link>
            </li>
            <li>
              <span className="border-b-2 border-black pb-1">Contact</span>
            </li>
            <li>
              <a href="#" className="hover:text-black">About</a>
            </li>
            <li>
              <Link to="/" className="hover:text-black">Sign Up</Link>
            </li>
          </ul>

          <div className="flex items-center gap-3">
            <div className="relative">
              <input
                type="text"
                placeholder="What are you looking for?"
                className="border border-gray-300 pl-4 pr-12 py-1.5 focus:outline-none focus:ring-2 focus:ring-black"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="black">
                  <path d="M21 21l-4.35-4.35M16.65 16.65a7.5 7.5 0 111.4-1.4z" />
                </svg>
              </button>
            </div>
            <button>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="h-6 w-6" fill="black">
                <path d="M225.8 468.2l-2.5-2.3L48.1 303.2..." />
              </svg>
            </button>
            <button>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="h-6 w-6" fill="black" stroke="black">
                <path d="M0 24C0 10.7 10.7 0 24 0..." />
              </svg>
            </button>
          </div>
        </nav>
      </header>

      <section className="pt-32 px-10">
        <div className="flex flex-col lg:flex-row justify-between gap-10">
          <aside className="w-full lg:w-1/2">
            <h1 className="text-gray-500 mb-4">Home / <span className="hover:text-black">Contact</span></h1>

            <div className="border-b-4 pb-4 border-gray-200">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="h-5 w-5 fill-white">
                    <path d="M164.9 24.6c-7.7-18.6..." />
                  </svg>
                </div>
                <h1>Call To Us</h1>
              </div>
              <p>We are available 24/7, 7 days a week.</p>
              <p>Phone: +977 9828924474</p>
            </div>

            <div className="mt-10">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="h-5 w-5 fill-white">
                    <path d="M164.9 24.6c-7.7-18.6..." />
                  </svg>
                </div>
                <h1>Write To Us</h1>
              </div>
              <p>Fill out our form and we will contact you within 24 hours.</p>
              <p>Emails: customer@exclusive.com</p>
              <p>Emails: support@exclusive.com</p>
            </div>
          </aside>

          <div className="w-full lg:w-1/2">
            <form className="bg-gray-100 p-6 rounded shadow">
              <div className="flex flex-col md:flex-row gap-4">
                <input type="text" placeholder="Your Name" className="flex-1 px-4 py-2 rounded border" required />
                <input type="email" placeholder="Your Email" className="flex-1 px-4 py-2 rounded border" required />
                <input type="tel" placeholder="Your Phone" className="flex-1 px-4 py-2 rounded border" required />
              </div>
              <textarea placeholder="Your Message" className="w-full mt-4 h-32 px-4 py-2 rounded border" required />
              <div className="flex justify-end mt-4">
                <button type="submit" className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600">
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      <footer className="bg-black text-white mt-10 pt-10 pb-10 px-10">
        <div className="flex flex-wrap justify-between gap-10">
          <div>
            <h4 className="text-lg font-semibold">DOKO</h4>
            <p>Subscribe</p>
            <p>Get 10% off your first order</p>
            <input type="email" placeholder="Enter your email" className="px-3 py-2 rounded text-black mt-2" />
          </div>

          <div>
            <h4 className="text-lg font-semibold">Support</h4>
            <p>111 Kathmandu,<br />Nepal</p>
            <p>edu4nepal@gmail.com</p>
            <p>+977 9823456789</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold">Account</h4>
            <p>My Account</p>
            <p>Cart</p>
            <p>Wishlist</p>
            <p>Shop</p>
          </div>

          <div>
            <h4 className="text-lg font-semibold">Quick Link</h4>
            <p>Privacy Policy</p>
            <p>Terms of Use</p>
            <p>FAQ</p>
            <p>Contact</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Contact;
