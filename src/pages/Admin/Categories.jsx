import { useEffect, useState } from "react";
import AdminDashboard from "../../components/Admin/AdminDashboard";
import axios from "../../services/axios";

export const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = async () => {
    try {
      const res = await axios.get("/api/category");
      setCategories(res.data.categories);
      setLoading(false);
    } catch (err) {
      setError("Failed to load categories");
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleAddCategory = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/category/create", { name });
      setName("");
      fetchCategories();
    } catch (err) {
      alert(err.response?.data?.message || "Error adding category");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this category?")) return;
    try {
      await axios.delete(`/api/category/delete/${id}`);
      fetchCategories();
    } catch (err) {
      alert("Failed to delete category");
    }
  };

  return (
    <AdminDashboard>
      <div className="my-5">
        <div className="flex justify-between items-center mb-5">
          <div>
            <h1 className="text-xl font-semibold">Categories</h1>
            <p>Total Categories: {categories.length}</p>
          </div>
        </div>

        <form onSubmit={handleAddCategory} className="flex gap-3 mb-5">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter category name"
            className="border p-2 rounded w-64"
            required
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Add
          </button>
        </form>

        {loading ? (
          <p>Loading categories...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <table className="w-full table-auto border">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2 text-left">Name</th>
                <th className="border p-2 text-left">Slug</th>
                <th className="border p-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat._id}>
                  <td className="border p-2">{cat.name}</td>
                  <td className="border p-2">{cat.slug}</td>
                  <td className="border p-2">
                    <button
                      onClick={() => handleDelete(cat._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AdminDashboard>
  );
};
