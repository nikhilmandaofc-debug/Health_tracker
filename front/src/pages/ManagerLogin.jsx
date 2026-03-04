import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { HeartPulse, Activity, AlertCircle } from "lucide-react";
import { useState } from "react";

export default function ManagerLogin() {

  const navigate = useNavigate();

  const [email,setEmail] = useState("");
  const [password,setPassword] = useState("");
  const [loading,setLoading] = useState(false);
  const [error,setError] = useState("");

  const handleLogin = async () => {

    setError("");

    if(!email || !password){
      setError("Please enter both email and password");
      return;
    }

    try{

      setLoading(true);

      const res = await fetch("http://127.0.0.1:8000/login",{
        method:"POST",
        headers:{
          "Content-Type":"application/json"
        },
        body: JSON.stringify({
          email,
          password,
          role:"manager"
        })
      });

      const data = await res.json();

      if(res.ok){

        navigate("/manager-dashboard");

      }else{

        setError(data.detail || "Invalid manager credentials");

      }

    }catch(error){

      setError("Server connection failed");

    }finally{

      setLoading(false);

    }

  };

  return (

    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 via-white to-cyan-100">

      {/* BACK BUTTON */}

      <div className="absolute top-6 left-8">

        <button
          onClick={() => navigate("/")}
          className="text-gray-600 hover:text-teal-600"
        >
          ← Back
        </button>

      </div>


      {/* LOGIN CARD */}

      <motion.div
        initial={{opacity:0,y:40}}
        animate={{opacity:1,y:0}}
        transition={{duration:0.6}}
        className="bg-white shadow-2xl rounded-2xl p-10 w-[420px] border border-gray-100"
      >

        {/* HEADER */}

        <div className="text-center mb-6">

          <div className="flex justify-center mb-3">
            <HeartPulse size={36} className="text-teal-600"/>
          </div>

          <h2 className="text-2xl font-bold text-gray-800">
            Manager Login
          </h2>

          <p className="text-gray-500 text-sm mt-1">
            Access the hospital operations dashboard
          </p>

        </div>


        {/* ERROR MESSAGE */}

        {error && (

          <motion.div
            initial={{opacity:0,y:-10}}
            animate={{opacity:1,y:0}}
            className="flex items-center gap-2 bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-lg mb-4"
          >
            <AlertCircle size={18}/>
            {error}
          </motion.div>

        )}


        {/* EMAIL */}

        <div className="mb-4">

          <label className="text-sm text-gray-600">
            Email
          </label>

          <input
            type="email"
            placeholder="manager@hospital.com"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="w-full mt-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 outline-none"
          />

        </div>


        {/* PASSWORD */}

        <div className="mb-6">

          <label className="text-sm text-gray-600">
            Password
          </label>

          <input
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="w-full mt-1 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-teal-500 outline-none"
          />

        </div>


        {/* LOGIN BUTTON */}

        <button
          onClick={handleLogin}
          disabled={loading}
          className="w-full bg-teal-600 text-white py-3 rounded-lg font-semibold hover:bg-teal-700 transition"
        >
          {loading ? "Logging in..." : "Login to Manager Dashboard"}
        </button>


        {/* FOOTER */}

        <div className="flex items-center justify-center gap-2 mt-6 text-gray-500 text-sm">

          <Activity size={16}/>

          Hospital Operations Access

        </div>

      </motion.div>

    </div>

  );
}