import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext.jsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const { login, authLoading, error } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [pendingStatus, setPendingStatus] = useState(null); 
  const [toastCount, setToastCount] = useState(0);
  const [queueNextToast, setQueueNextToast] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (toastCount >= 3) return; 
    const result = await login(form);

    if (result?.success) {
      setPendingStatus("success");
    } else {
      setResultError(result?.error);
      setPendingStatus("error");
    }
  };

  useEffect(() => {
    if (!pendingStatus || toastCount >= 3 || queueNextToast) return;

    if (pendingStatus === "success") {
      toast.success("🎉 Login successful!", {
        onClose: () => {
          setToastCount((prev) => prev + 1);
          setPendingStatus(null);
          setQueueNextToast(true);
          navigate('/');
        },
      });
    } else if (pendingStatus === "error") {
      toast.error(`❌ ${error || "Login failed"}`, {
        onClose: () => {
          setToastCount((prev) => prev + 1);
          setPendingStatus(null);
          setQueueNextToast(true);
        },
      });
    }
  }, [pendingStatus, toastCount, error, queueNextToast]);

  useEffect(() => {
    if (queueNextToast && toastCount < 3) {
      const timer = setTimeout(() => {
        setQueueNextToast(false);
      }, 500); 
      return () => clearTimeout(timer);
    }
  }, [queueNextToast, toastCount]);

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-sm my-20 mx-auto p-6 bg-white shadow-lg rounded-xl transition-all duration-300 ease-in-out transform hover:scale-105"
    >
      <h2 className="text-xl font-semibold mb-4 text-center text-gray-700">Login</h2>

      <div className="mb-4">
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={form.email}
          onChange={handleChange}
          required
          className="mb-3 border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
        />
        {/* Email Error Message */}
        {error?.includes("email") && (
          <p className="text-xs text-red-500">{error}</p>
        )}
      </div>

      <div className="mb-6">
        <input
          type="password"
          name="password"
          placeholder="Your Password"
          value={form.password}
          onChange={handleChange}
          required
          className="mb-3 border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all duration-200"
        />
        {/* Password Error Message */}
        {error?.includes("password") && (
          <p className="text-xs text-red-500">{error}</p>
        )}
      </div>

      {/* Login Button */}
      <button
        type="submit"
        disabled={authLoading}
        className={`w-full py-2 rounded text-white ${
          authLoading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
        } transition-all duration-200 flex justify-center items-center gap-2`}
      >
        {authLoading ? (
          <div className="animate-spin rounded-full border-t-2 border-white w-6 h-6" />
        ) : (
          "Log In"
        )}
      </button>

      <p className="text-sm opacity-80 text-center mt-5">
        Don't have an Account?{" "}
        <Link className="text-blue-800 font-semibold hover:text-blue-900 transition-all" to="/signup">
          Signup here
        </Link>
      </p>
    </form>
  );
};
