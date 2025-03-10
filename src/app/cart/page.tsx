"use client";
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '@/redux/store';
import { removeFromCart, updateQuantity } from '@/redux/features/cartSlice';
import Image from 'next/image';
import { FiMinus, FiPlus, FiTrash2 } from 'react-icons/fi';

export default function CartPage() {
    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const totalQuantity = useSelector((state: RootState) => state.cart.totalQuantity);

    const calculateTotal = () => {
        return cartItems.reduce((total, item) => {
            const price = parseFloat(item.price.toString().replace(/[^0-9.-]+/g, ""));
            return total + (price * item.quantity);
        }, 0);
    };

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-8">Shopping Cart ({totalQuantity} items)</h1>

            {cartItems.length === 0 ? (
                <p className="text-gray-500">Your cart is empty</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div className="md:col-span-2">
                        {cartItems.map((item) => (
                            <div key={item.id} className="flex gap-4 border-b py-4">
                                <Image
                                    src={item.image}
                                    alt={item.name}
                                    width={100}
                                    height={100}
                                    className="rounded-lg"
                                />
                                <div className="flex-grow">
                                    <h3 className="font-semibold">{item.name}</h3>
                                    <p className="text-gray-600">{item.price}</p>
                                    {/* {item.size && <p className="text-sm text-gray-500">Size: {item.size}</p>}
                                    {item.color && (
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm text-gray-500">Color:</span>
                                            <span 
                                                className="w-4 h-4 rounded-full" 
                                                style={{ backgroundColor: item.color }}
                                            ></span>
                                        </div>
                                    )} */}
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => dispatch(updateQuantity({ 
                                                id: item.id, 
                                                quantity: Math.max(1, item.quantity - 1) 
                                            }))}
                                            className="p-1 hover:bg-gray-100 rounded"
                                        >
                                            <FiMinus />
                                        </button>
                                        <span className="w-8 text-center">{item.quantity}</span>
                                        <button
                                            onClick={() => dispatch(updateQuantity({ 
                                                id: item.id, 
                                                quantity: item.quantity + 1 
                                            }))}
                                            className="p-1 hover:bg-gray-100 rounded"
                                        >
                                            <FiPlus />
                                        </button>
                                    </div>
                                    <button
                                        onClick={() => dispatch(removeFromCart({ id: item.id }))}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <FiTrash2 />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Order Summary */}
                    <div className="bg-gray-50 p-6 rounded-lg h-fit">
                        <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                        <div className="space-y-2">
                            <div className="flex justify-between">
                                <span>Subtotal</span>
                                <span>Rp {calculateTotal().toLocaleString()}</span>
                            </div>
                            <div className="flex justify-between">
                                <span>Shipping</span>
                                <span>Free</span>
                            </div>
                            <div className="border-t pt-2 mt-2">
                                <div className="flex justify-between font-semibold">
                                    <span>Total</span>
                                    <span>Rp {calculateTotal().toLocaleString()}</span>
                                </div>
                            </div>
                        </div>
                        <button className="w-full bg-black text-white py-3 rounded-lg mt-6 hover:bg-gray-800 transition">
                            Proceed to Checkout
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
} 