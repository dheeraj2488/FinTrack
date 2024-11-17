import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { LogoutOutlined , HomeFilled } from "@ant-design/icons";
const Header = () => {
  const {user,logout}=useAuth();

  const handleClick=()=>{
      logout();
  }
  return (
    <nav className="bg-white border-gray-200 dark:bg-gray-900 ">
      
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
      
        <Link
          to="/"
          className="flex items-center space-x-3 rtl:space-x-reverse "
        >
         
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            Expense Management
          </span>
        </Link>
       
        <div className="hidden w-full md:block md:w-auto" id="navbar-default">
          <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            <li>
              <Link
                to="/"
                className="block py-2 px-3 rounded  md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white "
                aria-current="page"
              >
              <HomeFilled />  {user && user.name} 
              </Link>
            </li> 

           

            <li>
              <button
                onClick={handleClick}
                className="block py-1 px-3 rounded  md:border-0   text-white  md:bg-red-500 hover:bg-red-700 "
              >
                <LogoutOutlined />
                Log out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
