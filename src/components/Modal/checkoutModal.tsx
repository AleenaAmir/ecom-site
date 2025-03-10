"use client";
import React, { useState } from "react";
import { useAppDispatch } from "@/redux/hooks";
import { clearCart } from "@/redux/features/cartSlice";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from 'react-toastify';
import axios from "axios";


interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  totalCheckoutAmount: number;
  cartItems: { name: string; quantity: number }[];
}

const schema = z.object({
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  streetAddress: z.string().min(1, "Street Address is required"),
  city: z.string().min(1, "City is required"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  email: z.string().email("Invalid email address"),
  additionalInfo: z.string().optional(),
});

const CheckoutModal: React.FC<CheckoutModalProps> = ({ isOpen, onClose, totalCheckoutAmount, cartItems }) => {
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const dispatch = useAppDispatch();
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  const handleCheckout = async (data: any) => {

    const updatedData = {
      ...data, totalCheckoutAmount: totalCheckoutAmount,
      itemName: cartItems.map(item => item.name), itemQuantity: cartItems.map(item => item.quantity),
      quantity: cartItems.map(item => item.quantity),
    }

    const response = await axios.post("https://ecom-site-livid.vercel.app/api/orders", updatedData);

    if (response.status === 201) {
      toast.success("Checkout successful!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    dispatch(clearCart());
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full md:w-3/4 lg:w-2/3">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Checkout</h2>
          <button className="text-gray-500 hover:text-black" onClick={onClose}>
            Close
          </button>
        </div>
        <div className="max-w-6xl mx-auto px-6 py-2 grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Left: Billing Details Form */}
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-6">Billing details</h2>
            <form className="grid grid-cols-2 gap-4" onSubmit={handleSubmit(handleCheckout)}>
              <Controller
                name="firstName"
                control={control}
                render={({ field }) => (
                  <>
                    <input {...field} type="text" placeholder="First Name" className="border p-2 rounded-md" />
                    {errors.firstName && <div className="text-red-500">{errors.firstName.message}</div>}
                  </>
                )}
              />

              <Controller
                name="lastName"
                control={control}
                render={({ field }) => (
                  <>
                    <input {...field} type="text" placeholder="Last Name" className="border p-2 rounded-md" />
                    {errors.lastName && <div className="text-red-500">{errors.lastName.message}</div>}
                  </>
                )}
              />

              <Controller
                name="streetAddress"
                control={control}
                render={({ field }) => (
                  <>
                    <input {...field} type="text" placeholder="Street Address" className="col-div-2 border p-2 rounded-md" />
                    {errors.streetAddress && <div className="text-red-500">{errors.streetAddress.message}</div>}
                  </>
                )}
              />

              <Controller
                name="city"
                control={control}
                render={({ field }) => (
                  <>
                    <input {...field} type="text" placeholder="Town / City" className="border p-2 rounded-md" />
                    {errors.city && <div className="text-red-500">{errors.city.message}</div>}
                  </>
                )}
              />
              {errors.city && <div className="text-red-500">{errors.city.message}</div>}

              <Controller
                name="phone"
                control={control}
                render={({ field }) => (
                  <>
                    <input {...field} type="text" placeholder="Phone" className="border p-2 rounded-md" />
                    {errors.phone && <div className="text-red-500">{errors.phone.message}</div>}
                  </>
                )}
              />
              {errors.phone && <div className="text-red-500">{errors.phone.message}</div>}

              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <>
                    <input {...field} type="email" placeholder="Email Address" className="col-span-2 border p-2 rounded-md" />
                    {errors.email && <span className="text-red-500">{errors.email.message}</span>}
                  </>
                )}
              />
              {errors.email && <span className="text-red-500">{errors.email.message}</span>}

              <Controller
                name="additionalInfo"
                control={control}
                render={({ field }) => (
                  <textarea {...field} placeholder="Additional Information" className="col-span-2 border p-2 rounded-md"></textarea>
                )}
              />
            </form>
          </div>

          {/* Right: Order Summary */}
          <div className="bg-white shadow-md p-6 rounded-lg">
            <h2 className="text-2xl font-semibold mb-6">Product Summary</h2>
            <div className="border-b pb-4">
              <div className="flex justify-between font-semibold text-lg mt-2">
                <span>Total</span>
                <span className="text-yellow-600">Rp {totalCheckoutAmount.toLocaleString()}</span>
              </div>
            </div>

            {/* Payment Method */}
            <div className="mt-4">
              <label className="flex items-center space-x-2 mt-4">
                <input
                  type="radio"
                  name="payment"
                  value="cod"
                  checked={paymentMethod === "cod"}
                  onChange={() => setPaymentMethod("cod")}
                />
                <span>Cash on Delivery</span>
              </label>
            </div>

            {/* Place Order Button */}
            <button
              type="button"
              className="mt-6 w-full bg-yellow-600 text-white px-4 py-2 rounded-md hover:bg-yellow-700 transition"
              onClick={handleSubmit(handleCheckout)}
            >
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutModal;
