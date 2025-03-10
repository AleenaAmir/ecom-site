"use client";
import React from "react";

const Contact = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900">Contact Us</h1>
        <p className="text-gray-600 mt-2">
          We'd love to hear from you! Reach out with any questions or inquiries.
        </p>
      </div>

      {/* Contact Information */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="space-y-6">
          <h2 className="text-2xl font-semibold text-gray-900">Get In Touch</h2>
          <p className="text-gray-600">
            Whether you have a question about our products, pricing, or anything else, our team is ready to help.
          </p>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">📍 Address</h3>
            <p className="text-gray-600">lahore, Pakistan</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">📞 Phone</h3>
            <p className="text-gray-600">+92 345 678 9012</p>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">📧 Email</h3>
            <a href="mailto:support@furniturebrand.com" className="text-gray-600">support@furniturebrand.com</a>
          </div>
        </div>

        {/* Contact Form */}
        <div className="bg-gray-100 p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-gray-900">Send a Message</h2>
          <form className="mt-6 space-y-4">
            <input type="text" placeholder="Your Name" className="w-full border p-3 rounded-md" required />
            <input type="email" placeholder="Your Email" className="w-full border p-3 rounded-md" required />
            <textarea placeholder="Your Message" rows={4} className="w-full border p-3 rounded-md" required></textarea>
            <button type="submit" className="w-full bg-yellow-600 text-white p-3 rounded-md hover:bg-yellow-700 transition">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
