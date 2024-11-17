import React, { useState ,useEffect} from "react";
import { Link ,useNavigate} from "react-router-dom";
import axios from 'axios'
import Spinner from "../components/Spinner";
import { toast } from 'react-toastify'
import { useAuth } from "../context/AuthContext";
const Register = () => {
  
  const navigate=useNavigate();
  const {user}=useAuth()
  const [loading,setLoading]=useState(false)
    const [name,setName]=useState("");
    const [email,setEmail]=useState("");
    const [password,setPassword]=useState("");
    useEffect(() => {
      if (user) {
        navigate("/"); 
      }
    }, [user, navigate]);
    const handlesubmit=async(e)=>{
      e.preventDefault()
        try{
          setLoading(true)
          
          const response=await axios.post('http://localhost:8080/api/users/register',{name,email,password})
          if(response.data.success){
            toast.success('Registration successful!', {
              position: "top-right",
              autoClose: 3000,
            });
            setLoading(false)
            navigate('/login')
          }else{
            toast.error(response.data.message || 'Registration failed.', {
              position: "top-right",
              autoClose: 3000,
            });
            
            setLoading(false)
          }
        }catch (err) {
          setLoading(false);
          if (err.response && err.response.data && err.response.data.message) {
            toast.error(err.response.data.message || 'Registration failed.', {
              position: "top-right",
              autoClose: 3000,
            });
           
          } else {
            toast.error('An unexpected error occurred.', {
              position: "top-right",
              autoClose: 3000,
            });
          }
    
          
        }
    }
  return (
    <section className="bg-gray-900 min-h-screen flex items-center justify-center">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto sm:max-w-md lg:py-0">
        <div className="w-full rounded-lg shadow border bg-gray-800 border-gray-700">
          <div className="p-6 space-y-6">
            <h1 className="text-xl font-bold md:text-2xl text-white text-center">
              Register Here
            </h1>
            {loading && <Spinner/> }
            <form className="space-y-6" onSubmit={handlesubmit}>
              <div>
                <label
                  htmlFor="name"
                  className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
                >
                    Name
                </label>
                <input
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  type="text"
                  name="name"
                  id="name"
                  className="border rounded-lg  block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500"
                  placeholder="enter your name here"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block mb-2 text-md font-medium text-gray-900 dark:text-white"
                >
                  Email
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
              
              <button
                type="submit"
                className="w-full text-white bg-red-500 hover:bg-red-700  font-medium rounded-lg text-md px-5 py-2.5 text-center "
              >
                Register
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                 to='/login'
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Log in
                </Link>
              </p>
             
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
