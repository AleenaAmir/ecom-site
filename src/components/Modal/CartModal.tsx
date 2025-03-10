"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { FaTimes } from "react-icons/fa";
import { removeFromCart, clearCart } from "@/redux/features/cartSlice";
import useDialog from "../hooks/useDialog";
import CheckoutModal from "./checkoutModal";

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose }) => {
  const cartItems = useAppSelector((state) => state.cart.items);
  const { isOpen: isCheckoutOpen, openDialog: openCheckoutDialog, closeDialog: closeCheckoutDialog } = useDialog();
  const [totalCheckoutAmount, setTotalCheckoutAmount] = useState(0);
  const dispatch = useAppDispatch();

  const handleRemoveItem = (id: string) => {
    dispatch(removeFromCart({ id }));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  // Calculate the total amount for the cart
  const totalAmount = cartItems.reduce((acc, item) => {
    const discountedPrice = item.discount ? item.price * (1 - item.discount / 100) : item.price;
    return acc + discountedPrice * (item.quantity - 1);
  }, 0);

  useEffect(() => {
    setTotalCheckoutAmount(totalAmount);
  }, [totalAmount]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2 lg:w-1/3">
        {/* Header */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Your Cart ({cartItems.length})</h2>
          <FaTimes className="cursor-pointer text-gray-500 hover:text-black" onClick={onClose} />
        </div>

        {/* Cart Items */}
        {cartItems.length === 0 ? (
          <p className="text-center text-gray-500">Your cart is empty.</p>
        ) : (
          <ul className="space-y-4">
            {cartItems.map((item) => {
              const discountedPrice = item.discount
                ? item.price * (1 - item.discount / 100)
                : item.price;
              const totalPrice = discountedPrice * (item.quantity - 1);

              return (
                <li key={item.id} className="flex justify-between items-center border-b pb-4">
                  <div className="flex items-center">
                    <Image src={item.image} alt={item.name} width={60} height={60} className="rounded-md object-cover" />
                    <div className="ml-4">
                      <h3 className="font-semibold">{item.name}</h3>

                      {item.discount && (
                        <p className="text-sm text-red-500">Discount: {item.discount}%</p>
                      )}

                      <p className="text-sm text-gray-500">
                        Original Price: <span className="line-through">Rp {item.price.toLocaleString()}</span>
                      </p>
                      {item.discount && (
                        <p className="text-sm text-green-600 font-semibold">
                          Discounted Price: Rp {discountedPrice.toLocaleString()}
                        </p>
                      )}
                      <p className="text-sm text-blue-600 font-semibold">
                        Total: Rp {totalPrice.toLocaleString()}
                      </p>

                      <p className="text-sm text-gray-500">Quantity: {item.quantity - 1}</p>
                    </div>
                  </div>

                  <button
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    onClick={() => handleRemoveItem(item.id)}
                  >
                    Remove
                  </button>
                </li>
              );
            })}
          </ul>
        )}

        {cartItems.length > 0 && (
          <>
            <div>
              <p>Total Amount: Rp {totalAmount.toLocaleString()}</p>
            </div>
            <button
              className="mt-4 bg-yellow-600 text-white px-4 py-2 rounded w-full hover:bg-yellow-700 transition"
              onClick={() => {
                openCheckoutDialog();
              }}
            >
              Checkout
            </button>
            <button
              className="mt-4 bg-yellow-600 text-white px-4 py-2 rounded w-full hover:bg-yellow-700 transition"
              onClick={onClose}
            >
              Close
            </button>
            <button
              className="mt-4 bg-yellow-600 text-white px-4 py-2 rounded w-full hover:bg-yellow-700 transition"
              onClick={handleClearCart}
            >
              Clear Cart
            </button>
          </>
        )}
      </div>
      {isCheckoutOpen && (
        <CheckoutModal
          isOpen={isCheckoutOpen}
          onClose={closeCheckoutDialog}
          totalCheckoutAmount={totalCheckoutAmount}
          cartItems={cartItems.map(item => ({ name: item.name, quantity: item.quantity }))}
        />
      )}
    </div>
  );
};

export default CartModal;
