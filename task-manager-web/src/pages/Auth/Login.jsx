import React, { useState } from 'react';
import AuthLayout from '../../components/layouts/AuthLayout';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input';
import { validationEmail } from '../../utils/helper';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { BASE_URL } from '../../utils/apiPaths';
import { addUser } from '../../utils/userSlice';

const Login = () => {
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () => {
    if (!validationEmail(emailId)) {
      setError('Enter the  valid Email ID .');
      return;
    }

    if (!password) {
      setError('Enter the valid password.');
      return;
    }
    // if login successful, clear error
    setError('');

    try {
      const res = await axios.post(
        BASE_URL + '/auth/login',
        { emailId, password },
        { withCredentials: true }
      );
      console.log(res.data.data);
      dispatch(addUser(res.data.data));
      const { role } = res.data.data;
      if (role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/user/dashboard');
      }
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <AuthLayout>
      <div className="lg:w-[60%]  md:h-[600px]  flex flex-col justify-center  border border-blue-500 shadow-2xl mt-7  rounded-3xl p-10">
        <h3 className="text-xl font-semibold text-black mb-5 ">
          Welcome Back!
        </h3>
        <form onSubmit={(e) => e.preventDefault()}>
          <Input
            value={emailId}
            onChange={({ target }) => setEmailId(target.value)}
            label="Email ID"
            placeholder="Enter the email address"
            type="text"
          />
          <Input
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            label="Password"
            placeholder="Enter the password"
            type="password"
          />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className=" w-full mt-4 bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-lg"
            onClick={handleLogin}
          >
            Login
          </button>
          <p className="text-md mt-5 text-gray-600">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="font-medium  cursor-pointer text-blue-600 hover:text-orange-600"
            >
              SignUp
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
