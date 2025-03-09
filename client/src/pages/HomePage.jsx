import React, { useEffect, useState } from "react";
import { Button, Modal, Table, Select, DatePicker, Space } from "antd";
import Layout from "../components/Layout/Layout";
import { useAuth } from "../context/AuthContext";
import Spinner from "../components/Spinner";
import axios from "axios";
import { toast } from "react-toastify";
import moment from "moment";
import { UnorderedListOutlined, AreaChartOutlined ,EditOutlined , DeleteOutlined } from "@ant-design/icons";
import Analytics from "../components/Analytics";
const { RangePicker } = DatePicker;

const HomePage = () => {
  // Form state
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const [reference, setReference] = useState("");
  const [description, setDescription] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [transactions, setTransactions] = useState([]);
  const [frequency, setFrequency] = useState("7");
  const [selectDate, setSelectDate] = useState([]);
  const [viewData, setViewData] = useState("table");
  const [mode, setMode] = useState("all");
  const [editable , setEditable] = useState(null)

  const { loading, user } = useAuth();
  // console.log(editable)
  const getTransactions = async (userid, frequency, selectDate, mode) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/transactions/get-transactions",
        { userid, frequency, selectDate, mode }
      );
      if (response.data) {
        // console.log(response.data);
        setTransactions(response.data);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message || "Failed.", {
        position: "top-center",
        autoClose: 2000,
      });
    }
  };

  useEffect(() => {
    if (editable) {
      setAmount(editable.amount);
      setType(editable.type);
      setCategory(editable.category);
      setReference(editable.reference);
      setDescription(editable.description);
      setDate(moment(editable.date).format("YYYY-MM-DD"));
    } else {
      setAmount("");
      setType("");
      setCategory("");
      setReference("");
      setDescription("");
      setDate("");
    }  
    
    
    if (user) {
      getTransactions(user._id, frequency, selectDate, mode);
    }
  }, [frequency, selectDate, mode, user  , editable ]);
  
 
  const columns = [
    {
      title: "Date",
      dataIndex: "date",
      render: (text) => <span>{moment(text).format("YYYY-MM-DD")}</span>,
      key: "date",
    },
    {
      title: "Amount",
      dataIndex: "amount",
      key: "amount",
    },
    {
      title: "Type",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Reference",
      dataIndex: "reference",
      key: "reference",
    },
    {
      title: "Action",
      render :(text , record)=>(
      
        <div>
          
          <EditOutlined className="cursor-pointer mx-2 text-blue-500" onClick={()=>{
            setEditable(record)
            setShowModal(true)
          }}/>
          <DeleteOutlined className="cursor-pointer mx-2 text-blue-500" onClick={()=>{handelDelete(record)}}/>
        </div>
      ),
    },
  ];

  const handelDelete = async(record)=>{
    try{
      
      const response = await axios.post("http://localhost:8080/api/transactions/delete-transaction",{
        transactionId:record._id
      });
      if(response.data.success){
        toast.success("Transaction deleted successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
        getTransactions(user._id, frequency, selectDate, mode);
      }
      
    }catch(error){
      toast.error(error.response.data.message || "Failed.", {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };
  const handelSubmit = async (e) => {
    e.preventDefault();
    try {
      if(editable){
        const response = await axios.post(
          "http://localhost:8080/api/transactions/edit-transaction",
          {
            transactionId:editable._id
           ,userid:user._id,
           amount,type,category , reference ,description , date,
          }
        );
        if (response.data.success) {
          toast.success("Transaction updated successfully!", {
            position: "top-right",
            autoClose: 3000,
          });
        }
        setEditable(null);

      }else{
         
        const response = await axios.post(
          "http://localhost:8080/api/transactions/add-transaction",
          {
            userid: user._id,
            amount,
            type,
            category,
            reference,
            description,
            date,
          }
        );
        if (response.data.success) {
          toast.success("Transaction added successfully!", {
            position: "top-right",
            autoClose: 3000,
          });
        }


      }
      setShowModal(false);
      getTransactions(user._id, frequency, selectDate, mode);
      
    } catch (error) {
      toast.error(error.response.data.message || "Failed.", {
        position: "top-right",
        autoClose: 3000,
      });
      setShowModal(false);
    }
  };

  if (loading) {
    return <Spinner />;
  }

  return (
    <Layout>
      <div className="h-full my-2 px-4 py-3 mx-auto shadow-lg ">
        <div className="container flex justify-between my-3 px-4 py-3 mx-auto shadow-lg">
          <h1 className="">Range Filters</h1>
          <div>
            <Button
              className="text-white bg-red-500 hover:bg-red-700"
              type="primary"
              onClick={() => setShowModal(true)}
            >
              Add new
            </Button>
          </div>
        </div>
        <div className="flex justify-between">
          <div className="container flex gap-10">
            <div>
              <h6 className="font-bold">Select Frequency</h6>
              <Select
                value={frequency}
                onChange={(values) => setFrequency(values)}
              >
                <Select.Option value="7">Last 1 Week</Select.Option>
                <Select.Option value="30">Last 1 Month</Select.Option>
                <Select.Option value="365">Last 1 Year</Select.Option>
                <Select.Option value="custom">Custom</Select.Option>
              </Select>
              {frequency === "custom" && (
                <RangePicker
                  value={selectDate}
                  onChange={(values) => setSelectDate(values)}
                />
              )}
            </div>
            <div>
              <h6 className="font-bold">Select Type</h6>
              <Select value={mode} onChange={(values) => setMode(values)}>
                <Select.Option value="all">All</Select.Option>
                <Select.Option value="income">Income</Select.Option>
                <Select.Option value="expense">Expense</Select.Option>
              </Select>
            </div>
          </div>
          <div className="border-4 rounded-md py-2">
            <UnorderedListOutlined
              className={`mx-3 size-10 cursor-pointer ${
                viewData === "table" ? "text-red-600" : "text-gray-500"
              }`}
              onClick={() => setViewData("table")}
            />
            <AreaChartOutlined
              className={`mx-3 size-10 cursor-pointer ${
                viewData === "analytics" ? "text-red-600" : "text-gray-500"
              }`}
              onClick={() => setViewData("analytics")}
            />
          </div>
        </div>
        {viewData === "table" ? (
          <Table columns={columns} dataSource={transactions} />
        ) : (
          <Analytics allTransaction={transactions}/>
        )}
      </div>

      <Modal
        title={editable ? 'Edit Transaction': 'Add Transaction'}
        open={showModal}
        onCancel={() => {
          setEditable(null)
          setShowModal(false)
        }
         }
        footer={false}
      >
        <form className="space-y-6" onSubmit={handelSubmit} initialvalues={editable}>
          <div>
            <label htmlFor="amount">Amount: </label>
            <input
              type="text"
              id="amount"
              name="amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="border rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500  shadow-xl"
            />
          </div>

          <div>
            <label htmlFor="type">Type: </label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="border rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 shadow-xl"
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
          </div>

          <div>
            <label htmlFor="category">Category: </label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="border rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 shadow-xl"
            >
              <option value="salary">Salary</option>
              <option value="tip">Tip</option>
              <option value="project">Project</option>
              <option value="food">Food</option>
              <option value="movie">Movie</option>
              <option value="bills">Bills</option>
              <option value="medical">Medical</option>
              <option value="fee">Fee</option>
              <option value="tax">Tax</option>
            </select>
          </div>

          <div>
            <label htmlFor="date">Date: </label>
            <input
              type="date"
              id="date"
              name="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="border rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 shadow-xl"
            />
          </div>

          <div>
            <label htmlFor="reference">Reference: </label>
            <input
              type="text"
              id="reference"
              name="reference"
              value={reference}
              onChange={(e) => setReference(e.target.value)}
              className="border rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 shadow-xl"
            />
          </div>

          <div>
            <label htmlFor="description">Description: </label>
            <input
              type="text"
              id="description"
              name="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-blue-500 focus:border-blue-500 shadow-xl"
            />
          </div>

          <button
            type="submit"
            className="w-full text-white bg-red-500 hover:bg-red-700 font-medium rounded-lg text-md px-5 py-2.5 text-center"
          >
            Save
          </button>
        </form>
      </Modal>
    </Layout>
  );
};

export default HomePage;
