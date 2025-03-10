"use client";
import Image from "next/image";
import { useState } from "react";
import { FaShoppingCart, FaHeart, FaBalanceScale } from "react-icons/fa";
import ProductDetails from "./ProductDetail";
import useDialog from "../hooks/useDialog";
import { useDispatch } from "react-redux";
import { addToCart } from "@/redux/features/cartSlice";

interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  discount?: number;
  new?: boolean;
  originalPrice?: number;
}

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { isOpen, openDialog, closeDialog } = useDialog();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);


  const handleAddToCart = () => {
    const productToAdd = { ...product, quantity: quantity, discount: product.discount ?? 0 };
    dispatch(addToCart(productToAdd));
    setSelectedProduct(product);
    openDialog();
  };

  return (
    <div className="relative group bg-white shadow-md p-4 rounded-lg mb-10">
      {/* Discount Badge */}
      {product.discount && (
        <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full text-center z-50">
          -{product.discount}%
        </span>
      )}

      {/* New Product Badge */}
      {product.new && (
        <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full text-center z-50">
          New
        </span>
      )}

      {/* Product Image */}
      <div className="relative w-full h-48">
        <Image
          src={product.image}
          alt={product.name}
          width={480}
          height={300}
          className="object-fill w-full h-full"
        />
        <div className="absolute inset-0 bg-transparent bg-opacity-50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
          <div className="flex space-x-3">
            <button
              className="bg-white text-black p-2 rounded-full shadow hover:bg-gray-200"
              onClick={handleAddToCart}
            >
              <FaShoppingCart size={18} />
            </button>
            <button className="bg-white text-black p-2 rounded-full shadow hover:bg-gray-200">
              <FaBalanceScale size={18} />
            </button>
            <button className="bg-white text-black p-2 rounded-full shadow hover:bg-gray-200">
              <FaHeart size={18} />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-4 text-center">
        <h3 className="text-lg font-semibold">{product.name}</h3>
        <p className="text-gray-500 text-sm">{product.category}</p>
        <div className="mt-2">
          <span className="text-yellow-600 font-bold">Rp {product.price}</span>
          {product.originalPrice && (
            <span className="text-gray-400 text-sm line-through ml-2">
              {product.originalPrice}
            </span>
          )}
        </div>
      </div>
      {isOpen && selectedProduct && (
        <ProductDetails
          product={selectedProduct}
          isOpen={isOpen}
          closeDialog={closeDialog}
        />
      )}
    </div>
  );
};

export default ProductCard;
