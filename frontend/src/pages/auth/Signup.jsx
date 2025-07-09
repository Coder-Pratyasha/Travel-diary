import React, { useEffect, useState } from 'react';
import PasswordInput from '../../components/PasswordInput';
import { useNavigate } from 'react-router-dom';
import axiosInstance from '../../utils/axiosInstance';
import { validateEmail } from '../../utils/helper';
import { useDispatch, useSelector } from 'react-redux';

const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const { loading, currentUser } = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name) {
      setError("Please enter your name");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!password) {
      setError("Please enter your password");
      return;
    }

    setError(null);

    try {
      const response = await axiosInstance.post("/auth/signup", {
        username: name,
        email,
        password,
      });

      if (response.data) {
        navigate("/login");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again");
      }
    }
  };

  useEffect(() => {
    if (!loading && currentUser) {
      navigate("/");
    }
  }, [currentUser]);

  return (
    <div className="h-screen bg-cyan-50 flex items-center justify-center px-4 overflow-hidden">
  <div className="relative w-full max-w-3xl h-[600px] mx-auto overflow-hidden rounded-lg shadow-lg">

  
    <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/2662086/pexels-photo-2662086.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')] bg-cover bg-center rounded-lg" />
    <div className="absolute inset-0 flex flex-col md:flex-row items-center justify-center md:justify-between bg-black/40 px-4 md:px-6 py-6">
      <div className="hidden md:block w-3/8 pl-3 text-white">
        <h4 className="text-4xl font-bold leading-snug">Create your<br />Stories</h4>
        <p className="text-sm font-medium mt-4 max-w-xs">
          Record your travel experiences and memories in your travel journey
        </p>
      </div>

   
      <div className="bg-white/80 w-full max-w-sm p-6 md:p-8 rounded-lg shadow-lg z-10">
            <form onSubmit={handleSubmit}>
              <h4 className="text-2xl font-semibold mb-7">Create Your Account</h4>

              <input
                type="text"
                placeholder="Enter your name"
                className="input-box"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="email"
                placeholder="Email"
                className="input-box"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <PasswordInput
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              {error && <p className="text-red-500 text-xs pb-1">{error}</p>}

              {loading ? (
                <p className="animate-pulse w-full text-center btn-primary">Loading</p>
              ) : (
                <button type="submit" className="btn-primary">SIGN UP</button>
              )}

              <p className="text-xs text-slate-500 text-center my-4">Or</p>
              <button
                type="button"
                className="btn-primary btn-light"
                onClick={() => navigate("/login")}
              >
                Already Have An Account
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
