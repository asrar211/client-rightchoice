import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const Register = () => {
  const { register, authLoading, error } = useContext(AuthContext);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: ""
  });

  const [status, setStatus] = useState(null); 
  const [toastCount, setToastCount] = useState(0);
  const [queueNextToast, setQueueNextToast] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (toastCount >= 3) return; 

    const result = await register(form);

    if (result?.success) {
      setStatus("success");
    } else {
      setStatus("error");
    }
  };

  useEffect(() => {
    if (!status || toastCount >= 3 || queueNextToast) return;

    if (status === "success") {
      toast.success("🎉 Registration successful!", {
        onClose: () => {
          setToastCount((prev) => prev + 1);
          setStatus(null);
          setQueueNextToast(true);
          navigate(-1);
        },
      });
    } else if (status === "error") {
      toast.error(`❌ ${error || "Registration failed"}`, {
        onClose: () => {
          setToastCount((prev) => prev + 1);
          setStatus(null);
          setQueueNextToast(true);
        },
      });
    }
  }, [status, toastCount, queueNextToast, error]);

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
      className="max-w-sm my-20 mx-auto p-6 bg-white shadow-md rounded-xl"
    >
      <h2 className="text-xl font-semibold mb-4 text-center">Create Account</h2>

      <input
        type="text"
        name="name"
        placeholder="Your Name"
        value={form.name}
        onChange={handleChange}
        required
        className="mb-3 border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="email"
        name="email"
        placeholder="Your Email"
        value={form.email}
        onChange={handleChange}
        required
        className="mb-3 border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="password"
        name="password"
        placeholder="Your Password"
        value={form.password}
        min={6}
        onChange={handleChange}
        required
        className="mb-3 border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <input
        type="text"
        name="phone"
        placeholder="Your Phone Number"
        maxLength={10}
        value={form.phone}
        onChange={handleChange}
        required
        className="mb-4 border rounded px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button
        type="submit"
        disabled={authLoading}
        className={`w-full py-2 rounded text-white ${
          authLoading ? 'bg-blue-300 cursor-not-allowed' : 'bg-blue-600 hover:bg-blue-700'
        } transition`}
      >
        {authLoading ? "Registering..." : "Sign Up"}
      </button>

      <p className="text-sm opacity-80 text-center mt-5">
        Already have an Account?{" "}
        <Link className="text-blue-800 font-semibold" to="/login">
          Login here
        </Link>
      </p>
    </form>
  );
};
