import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from '../services/axios';
import useCart from '../hooks/useCart';
import { ToastContainer, toast } from 'react-toastify';

export const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const fetchProduct = async () => {
    try {
      const { data } = await axios.get(`/api/products/${id}`);
      setProduct(data);
      if (data.image?.length > 0) {
        setMainImage(data.image[0]);
      }
    } catch (err) {
      console.error("Failed to fetch product", err);
      toast.error("Failed to load product. Try again later.");
    }
  };

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart({
      productId: product._id,
      name: product.name,
      price: product.price,
      quantity: Number(quantity),
      image: product.image[0],
    });

    toast.success(`${product.name} added to cart!`);
    navigate("/cart");
  };

  if (!product) {
    return (
      <div className="p-4 text-center mt-10 text-gray-600">
        <p>Loading product details...</p>
      </div>
    );
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <ToastContainer />

      <img
        src={mainImage}
        alt={product.name}
        className="w-full h-[300px] object-cover rounded-lg mb-4 transition duration-300"
      />

      <div className="flex gap-3 mb-4 overflow-x-auto">
        {product.image?.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`${product.name} ${index}`}
            className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 transition duration-200 hover:opacity-80 ${
              img === mainImage ? "border-black" : "border-transparent"
            }`}
            onClick={() => setMainImage(img)}
          />
        ))}
      </div>

      <h1 className="text-xl font-bold mt-4 uppercase">{product.name}</h1>
      <p className="text-xl font-bold mt-3">
        ₹{product.price}{" "}
        <span className="opacity-40 line-through ml-2">
          ₹{product.price + product.price * 0.4}
        </span>
      </p>
      <p className="text-base text-gray-600 font-light mt-2">{product.description}</p>
      <hr className="border-t border-gray-300 my-4" />

      <div className="flex items-center justify-between gap-4 mt-6">
        <div className="flex items-center border border-gray-300 rounded-full px-4 py-2">
          <button
            className={`text-xl px-2 ${quantity === 1 ? "opacity-40 cursor-not-allowed" : ""}`}
            onClick={() => setQuantity((prev) => Math.max(prev - 1, 1))}
            disabled={quantity === 1}
          >
            −
          </button>
          <span className="px-4 text-lg">{quantity}</span>
          <button
            className="text-xl px-2"
            onClick={() => setQuantity((prev) => prev + 1)}
          >
            +
          </button>
        </div>

        <button
          onClick={handleAddToCart}
          className="bg-black hover:bg-gray-800 text-white px-7 py-3 rounded-full transition duration-200"
        >
          Add to Cart
        </button>
      </div>

      <hr className="border-t border-gray-300 my-4" />
    </div>
  );
};
