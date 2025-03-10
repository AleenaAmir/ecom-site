"use client";
import { useState } from "react";
import Image from "next/image";
import { FaStar } from "react-icons/fa";
import { FiMinus, FiPlus } from "react-icons/fi";
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/redux/features/cartSlice';
import { RootState } from '@/redux/store';

interface Product {
    id: string;
    name: string;
    price: number;
    category: string;
    image: string;
    description?: string;
    rating?: number;
    reviews?: number;
    sizes?: string[];
    colors?: string[];
    images?: string[];
}

type ProductProps = {
    isOpen: boolean;
    closeDialog: () => void;
    product: Product;
}

const ProductDetailsModal = ({ product, isOpen, closeDialog }: ProductProps) => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.cart.items);
    const [selectedImage, setSelectedImage] = useState(product.image);
    const [quantity, setQuantity] = useState(1);
    const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || '');
    const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || '');

    const handleAddToCart = () => {
        const cartItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: quantity,
            category: product.category,
            size: selectedSize,
            color: selectedColor,
            discount: 0, // Adding the missing 'discount' property
        };

        dispatch(addToCart(cartItem));
        
        closeDialog();
    };

    return (
        <>
            {isOpen && (
                <div className="fixed inset-0 z-60 flex items-center justify-center bg-black bg-opacity-100">
                    <div className="bg-white rounded-lg overflow-hidden max-w-4xl w-full">
                        <div className="flex justify-end p-4">
                            <button onClick={closeDialog} className="text-gray-600 hover:text-black">
                                Close
                            </button>
                        </div>
                        <div className="px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-8">
                            {/* Left: Image Gallery */}
                            <div className="flex gap-4">
                                {/* Thumbnail Images */}
                                <div className="flex flex-col space-y-2">
                                    {product.images?.map((img, index) => (
                                        <div
                                            key={index}
                                            className={`cursor-pointer border-2 ${
                                                selectedImage === img ? "border-yellow-500" : "border-transparent"
                                            } rounded-lg p-1`}
                                            onClick={() => setSelectedImage(img)}
                                        >
                                            <Image src={img} alt={`Thumbnail ${index}`} width={60} height={60} className="rounded-md" />
                                        </div>
                                    ))}
                                </div>

                                {/* Main Product Image */}
                                <div className="w-full flex items-center justify-center bg-gray-100 rounded-lg">
                                    <Image src={selectedImage} alt={product.name} width={400} height={400} className="rounded-lg" />
                                </div>
                            </div>

                            {/* Right: Product Details */}
                            <div>
                                <h1 className="text-3xl font-bold">{product.name}</h1>
                                <p className="text-gray-600 text-lg">{product.price}</p>

                                {/* Sizes */}
                                {product.sizes && (
                                    <div className="mt-4">
                                        <h3 className="font-semibold">Size</h3>
                                        <div className="flex space-x-2 mt-2">
                                            {product.sizes.map((size) => (
                                                <span
                                                    key={size}
                                                    className={`border px-4 py-2 rounded-md cursor-pointer 
                                                        ${selectedSize === size 
                                                            ? 'border-black bg-black text-white' 
                                                            : 'border-gray-400 hover:border-black'}`}
                                                    onClick={() => setSelectedSize(size)}
                                                >
                                                    {size}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Colors */}
                                {product.colors && (
                                    <div className="mt-4">
                                        <h3 className="font-semibold">Color</h3>
                                        <div className="flex space-x-2 mt-2">
                                            {product.colors.map((color, index) => (
                                                <span
                                                    key={index}
                                                    className={`w-6 h-6 rounded-full cursor-pointer border-2
                                                        ${selectedColor === color 
                                                            ? 'border-black' 
                                                            : 'border-gray-200'}`}
                                                    style={{ backgroundColor: color }}
                                                    onClick={() => setSelectedColor(color)}
                                                ></span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Quantity Selector */}
                                <div className="mt-6 flex space-x-4">
                                    <div className="flex items-center border border-gray-400 rounded-md px-4 py-2">
                                        <button
                                            className="text-gray-600"
                                            onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        >
                                            <FiMinus />
                                        </button>
                                        <span className="mx-4">{quantity}</span>
                                        <button 
                                            className="text-gray-600" 
                                            onClick={() => setQuantity(quantity + 1)}
                                        >
                                            <FiPlus />
                                        </button>
                                    </div>

                                    {/* Add to Cart Button */}
                                    <button 
                                        onClick={handleAddToCart}
                                        className="px-6 py-2 bg-black text-white rounded-md hover:bg-gray-800 transition"
                                        disabled={!selectedSize && product.sizes?.length === 0}
                                    >
                                        Add To Cart
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductDetailsModal;
