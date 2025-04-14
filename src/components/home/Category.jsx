import { useEffect, useState } from "react";
import axios from "../../services/axios"; // Adjust path if necessary
import { Link } from "react-router-dom";

export const Category = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("/api/category");
      setCategories(res.data.categories || []);
    } catch (err) {
      setError("Failed to load categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  return (
    <>
      <div className="w-full h-5 bg-gradient-to-b from-white to-gray-200"></div>

      <div className="bg-gray-200 py-10 px-4 sm:px-20">
        <h1 className="text-center text-xl font-bold grot">
          BROWSE BY <br /> CATEGORY
        </h1>

        {loading ? (
          <p className="text-center mt-8">Loading...</p>
        ) : error ? (
          <p className="text-center text-red-500 mt-8">{error}</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mt-8">
            {categories.map((category) => (
              <Link
                to={`/category/${category._id}`} 
                key={category._id} 
                className="relative rounded-xl overflow-hidden block"
              >
                <img
                  className="w-full h-40 object-cover"
                  src={category.image || "data:image/jpeg;base64,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"}
                  alt={category.name}
                />
                <h4 className="absolute bottom-2 left-1/2 transform -translate-x-1/2 text-white font-semibold text-lg font-grot drop-shadow-md">
                  {category.name}
                </h4>
              </Link>
            ))}
          </div>
        )}
      </div>

      <div className="w-full h-5 bg-gradient-to-b from-gray-200 to-white"></div>
    </>
  );
};
