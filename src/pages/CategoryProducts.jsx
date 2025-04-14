import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "../services/axios";

export const CategoryProducts = () => {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const res = await axios.get(`/api/products/category/${id}`);
        setProducts(res.data.products); 
        setCategoryName();
      } catch (error) {
        console.error("Error fetching category products:", error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchCategoryProducts();
  }, [id]);

  if (loading) return <p className="text-center mt-8">Loading products...</p>;

  return (
    <div className="p-6">
      {/* <h1 className="text-2xl font-bold text-center mb-6">{categoryName}</h1> */}
      {products ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <div key={product._id} className="border rounded-xl p-4 shadow">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="mt-2 font-semibold text-lg">{product.name}</h3>
              <p className="text-sm text-gray-600">{product.price}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No products found.</p>
      )}
    </div>
  );
};

