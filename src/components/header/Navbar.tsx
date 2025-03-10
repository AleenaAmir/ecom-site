"use client";
import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaShoppingCart, FaBars, FaTimes } from "react-icons/fa";
import { useAppSelector } from "@/redux/hooks";
import Image from "next/image";
import useDialog from "../hooks/useDialog";
import CartModal from "../Modal/CartModal";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Product", path: "/product" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contactus" },
];

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isOpen, openDialog, closeDialog } = useDialog();
  const cartItems = useAppSelector((state) => state.cart.items);

  // const totalQuantity = useAppSelector((state) => state.cart.totalQuantity);

  return (
    <>
    <nav className="flex justify-between items-center px-6 py-4 shadow-md bg-white relative">
      {/* Logo */}
      <Link href="/" className="text-2xl font-bold flex items-center">
        <Image src="https://res.cloudinary.com/dstnwi5iq/image/upload/v1741600399/pngtree-gold-furniture-lamp-chair-interior-logo-design-template-inspirat-image_312127_b7e8qi.jpg" alt="logo" width={60} height={50} />
      </Link>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex space-x-6">
        {navLinks.map(({ name, path }) => (
          <li key={name}>
            <Link href={path} className="hover:text-yellow-600 transition">
              {name}
            </Link>
          </li>
        ))}
      </ul>

      {/* Icons */}
      <div className="flex space-x-4">
        
        <FaShoppingCart className="text-lg cursor-pointer hover:text-yellow-600 transition" onClick={() => openDialog()} />

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes className="text-lg" /> : <FaBars className="text-lg" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="absolute top-full left-0 w-full bg-white shadow-md md:hidden"
        >
          <ul className="flex flex-col space-y-4 p-4">
            {navLinks.map(({ name, path }) => (
              <li key={name}>
                <Link href={path} className="block hover:text-yellow-600" onClick={() => setMenuOpen(false)}>
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
      </nav>
      {isOpen && <CartModal isOpen={isOpen} onClose={closeDialog} />}
      </>
  );
};

export default Navbar;
