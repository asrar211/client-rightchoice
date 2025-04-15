import { useState, useEffect } from "react"
import AdminDashboard from "../../components/Admin/AdminDashboard"
import axios from "../../services/axios"
import { toast, ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"


export const Products = () => {
  const [showForm, setShowForm] = useState(false)
  const [categories, setCategories] = useState([])
  const [products, setProducts] = useState([])
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [loadingAction, setLoadingAction] = useState(false); // for form and delete loading


  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    stock: "",
    category: "",
    images: [],
  })

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

  const fetchProducts = async () => {
    try {
      const { data } = await axios.get("/api/products")
      setProducts(data)
    } catch (err) {
      console.error("Failed to fetch products", err)
    }
  }

  useEffect(() => {
    fetchCategories()
    fetchProducts()
  }, [])

  const handleChange = (e) => {
    const { name, value, files } = e.target
    if (name === "images") {
      setFormData((prev) => ({
        ...prev,
        images: files,
      }))
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }))
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoadingAction(true); 
  
    const data = new FormData();
    data.append("name", formData.name);
    data.append("price", formData.price);
    data.append("description", formData.description);
    data.append("category", formData.category);
    data.append("stock", formData.stock);
    for (let i = 0; i < formData.images.length; i++) {
      data.append("image", formData.images[i]);
    }
  
    try {
      if (editingProductId) {
        await axios.put(`/api/products/update/${editingProductId}`, data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Product updated successfully");
      } else {
        await axios.post("/api/products/add", data, {
          headers: { "Content-Type": "multipart/form-data" },
        });
        toast.success("Product added successfully");
      }
  
      setFormData({
        name: "",
        price: "",
        description: "",
        stock: "",
        category: "",
        images: [],
      });
      setEditingProductId(null);
      fetchProducts();
      setShowForm(false);
    } catch (error) {
      toast.error("Failed to submit product");
    } finally {
      setLoadingAction(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    setLoadingAction(true);
    try {
      await axios.delete(`/api/products/delete/${id}`);
      toast.success("Product deleted successfully");
      fetchProducts();
    } catch (err) {
      toast.error("Failed to delete product");
    } finally {
      setLoadingAction(false);
    }
  };
  
  const handleEdit = (product) => {
    setShowForm(true);
    setFormData({
      name: product.name,
      price: product.price,
      description: product.description,
      stock: product.stock,
      category: product.category._id,
      images: [],
    });
    setEditingProductId(product._id);
  };
  
  const [editingProductId, setEditingProductId] = useState(null);

  return (
    <>
    <ToastContainer position="top-right" autoClose={3000} />

    <AdminDashboard>
      <div className="my-5">
        <div className="flex justify-between items-center mb-5">
          <div>
            <h1 className="text-xl font-semibold">Products</h1>
            <p>Total Products: {products.length}</p>
          </div>
          <div>
            <button
              className="bg-blue-500 cursor-pointer text-white py-2 px-4 font-semibold rounded-md"
              onClick={() => setShowForm(!showForm)}
            >
              {showForm ? "Close" : "Add"}
            </button>
          </div>
        </div>

        {showForm && (
          <form
            onSubmit={handleSubmit}
            className="bg-white p-4 border rounded-md shadow-md max-w-md"
            encType="multipart/form-data"
          >
            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Product Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Price</label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Stock</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md"
                required
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded-md"
                required
              >
                <option value="">Select a category</option>
                {categories.map((cat) => (
                  <option key={cat._id} value={cat._id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-1">Images</label>
              <input
                type="file"
                name="images"
                multiple
                onChange={handleChange}
                className="w-full"
                accept="image/*"
                required
              />
            </div>

            <button
  type="submit"
  className="bg-green-500 cursor-pointer text-white px-4 py-2 rounded-md font-semibold disabled:opacity-60"
  disabled={loadingAction}
>
  {loadingAction ? "Submitting..." : "Submit"}
</button>

          </form>
        )}

        <div className="mt-10">
          <h2 className="text-lg font-semibold mb-4">Products</h2>
          <div className="flex flex-col gap-5">
          {products.map((product) => {
  const isSelected = selectedProductId === product._id;
  return (
    <div
      key={product._id}
      onClick={() =>
        setSelectedProductId((prevId) => (prevId === product._id ? null : product._id))
      }
      className={`cursor-pointer border-[1px] p-3 rounded-md transition-all duration-300 hover:shadow-lg ${
        isSelected ? "bg-gray-100" : ""
      }`}
    >
      <div className="flex items-center gap-4">
        {product.image?.[0] && (
          <img src={product.image[0]} alt={product.name} className="w-20 h-20 object-cover" />
        )}
        <div>
          <h3 className="font-bold text-lg">{product.name}</h3>
          <p className="text-gray-600">₹ {product.price}</p>
        </div>
      </div>

      {isSelected && (
        <div className="mt-3">
          <p className="text-sm">Stock: {product.stock}</p>
          <div className="flex gap-2 mt-2">
          <button
  onClick={(e) => {
    e.stopPropagation();
    handleEdit(product);
  }}
  className="bg-yellow-500 text-white px-3 py-1 rounded text-sm hover:bg-yellow-600 disabled:opacity-50"
  disabled={loadingAction}
>
  Edit
</button>
<button
  onClick={(e) => {
    e.stopPropagation();
    handleDelete(product._id);
  }}
  className="bg-red-500 text-white px-3 py-1 rounded text-sm hover:bg-red-600 disabled:opacity-50"
  disabled={loadingAction}
>
  {loadingAction ? "Deleting..." : "Delete"}
</button>
          </div>
        </div>
      )}
    </div>
  );
})}

          </div>   
        </div>
      </div>
    </AdminDashboard>
    </>
  )
}
