import { useState, useEffect } from "react";
import axios from "../services/axios";
import { Link } from "react-router-dom";

export const Shop = () => {
  const [products, setProducts] = useState([]);

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/products");
      setProducts(data);
    } catch (err) {
      console.error("Failed to fetch products", err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div className="my-10 flex flex-wrap gap-4 justify-center items-center">
      {products.map((product) => (
        <Link to={`/product/${product._id}`} key={product._id}>
        <div
          key={product._id}
          className="w-42 h-full border-[1px] border-gray-100 shadow-2xl shadow-blue-300 rounded-2xl"
        >
          {product.image?.[0] && (
            <img
            src={product.image[0]}
            alt={product.name}
            className="object-cover shadow-2xl object-center rounded-xl h-50 w-full"
          />
          )}
          <div className="ml-2 my-1">
            <h2 className="text-l font-semibold">{product.name}</h2>
            <p className="text-sm font-bold grot">${product.price}</p>
            <div className="flex justify-center items-center">
            </div>
          </div>
        </div>
        </Link>
      ))}
    </div>
  );
};
