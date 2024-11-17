import React, { useState ,useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import axios from "axios";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login ,user ,loading} = useAuth();
  const navigate = useNavigate();
  const handlesubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8080/api/users/login",
        { email, password }
      );
      if (response.data.success) {
        localStorage.setItem("token", response.data.token);
        toast.success("Login successful!", {
          position: "top-center",
          autoClose: 2000,
        });
        login(response.data.user);
        // navigate("/");
      } else {
        toast.error(response.data.message || "Login failed.", {
          position: "top-center",
          autoClose: 2000,
        });
      }
    } catch (error) {
      // console.log(error);
      if (error.response && !error.response.data.success) {
        toast.error(error.response.data.message || "Login failed.", { 
          position: "top-center",
          autoClose: 2000,
        });
      } else {
        toast.error("Server Error", { 
          position: "top-center",
          autoClose: 2000,
        });
      }
    }
  };
  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);
  return (
    
    <section className="bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto sm:max-w-md lg:py-0">
        <div className="w-full rounded-lg shadow border bg-gray-800 border-gray-700">
          <div className="p-6 space-y-6">
            <h1 className="text-xl font-bold md:text-2xl text-white text-center">
              Login
            </h1>
            {loading && <Spinner />}
            <form className="space-y-6" onSubmit={handlesubmit}>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
                >
                  Your email
                </label>
                <input
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  type="email"
                  name="email"
                  id="email"
                  className="border rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  placeholder="name@gmail.com"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block mb-2 text-md font-medium text-white"
                >
                  Password
                </label>
                <input
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="border  rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <div className="flex justify-end">
                <a
                  href="#"
                  className="text-md font-medium text-primary-600 hover:underline"
                >
                  {" "}
                  Forgot password?
                </a>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-red-500 hover:bg-red-700  font-medium rounded-lg text-md px-5 py-2.5 text-center "
              >
                Log in
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don’t have an account yet?{" "}
                <Link
                  to="/register"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Login;
