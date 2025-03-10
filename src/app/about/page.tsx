"use client";
import React from "react";
import Image from "next/image";

const About = () => {
  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900">About Us</h1>
        <p className="text-gray-600 mt-2">
          Bringing comfort and elegance to your home with premium quality furniture.
        </p>
      </div>

      {/* About Section */}
      <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-2xl font-semibold text-gray-900">Who We Are</h2>
          <p className="text-gray-600 mt-2">
            We are a leading furniture brand committed to crafting high-quality and stylish furniture.
            Our mission is to transform homes with timeless designs that blend luxury and functionality.
          </p>
          <p className="text-gray-600 mt-2">
            Whether you're looking for elegant sofas, durable dining sets, or cozy bedroom essentials,
            we offer a wide range of products designed to elevate your living space.
          </p>
        </div>

        <div>
          <Image
            src="https://res.cloudinary.com/dstnwi5iq/image/upload/v1694792458/kf75wzdoht81jk051ata.webp"
            alt="Furniture showroom"
            width={600}
            height={200}
            className="rounded-lg shadow-md"
          />
        </div>
      </div>

      {/* Why Choose Us */}
      <div className="mt-10">
        <h2 className="text-2xl font-semibold text-gray-900 text-center">Why Choose Us?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="bg-gray-100 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold">Premium Quality</h3>
            <p className="text-gray-600 mt-2">
              Crafted from the finest materials, ensuring durability and elegance.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold">Affordable Prices</h3>
            <p className="text-gray-600 mt-2">
              Luxury furniture at competitive prices for every budget.
            </p>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold">Customer Satisfaction</h3>
            <p className="text-gray-600 mt-2">
              Exceptional customer service and hassle-free shopping experience.
            </p>
          </div>
        </div>
      </div>

      {/* Contact Section */}
      <div className="mt-16 text-center">
        <h2 className="text-2xl font-semibold text-gray-900">Get in Touch</h2>
        <p className="text-gray-600 mt-2">
          Have questions? Contact us at{" "}
          <a href="mailto:support@furniturebrand.com" className="font-semibold text-yellow-600">support@furniturebrand.com</a>.
        </p>
      </div>
    </div>
  );
};

export default About;
