import React, { useState } from 'react';
import AuthLayout from '../../components/layouts/AuthLayout';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import Input from '../../components/Inputs/Input';
import { Link, useNavigate } from 'react-router-dom';
import { validationEmail } from '../../utils/helper';
import axios from 'axios';
import { BASE_URL } from '../../utils/apiPaths';
import { useDispatch } from 'react-redux';
import { addUser} from '../../utils/userSlice';
import uploadImage from '../../utils/uploadImages';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [emailId, setEmailId] = useState('');
  const [password, setPassword] = useState('');
  const [adminInviteToken, setAdminInviteToken] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSignUp = async () => {
    let profileImageUrl = '';

    if (!firstName) {
      setError('Enter the correct first name .');
      return;
    }

    if (!validationEmail(emailId)) {
      setError(' Enter the valid Email ID .');
      return;
    }
    if (!password) {
      setError('Enter the valid password.');
      return;
    }
    // if login successful, clear error
    setError('');
    try {
      if (profilePic) {
        const imageUploadRes = await uploadImage(profilePic);
        profileImageUrl = imageUploadRes.imageUrl || '';
      }
      const res = await axios.post(
        BASE_URL + '/auth/signup',
        {
          firstName: firstName,
          lastName: lastName,
          emailId: emailId,
          password: password,
          profileImageUrl,
          adminInviteToken: adminInviteToken,
        },
        { withCredentials: true }
      );
      // dispatch(addUsers(res.data.data));
      const userData = res.data.data;

      if (!userData || !userData.role) {
        setError('Signup failed: role not returned');
        return;
      }

      dispatch(addUser(userData));

      if (userData.role === 'admin') navigate('/admin/dashboard');
      else navigate('/user/dashboard');
    } catch (error) {
      const message = error.response?.data?.message || 'Something went wrong!';
      setError(message);
    }
  };
  return (
    <AuthLayout>
      <div className="lg:w-[80%] h-auto md:h-[600px] mt-10  flex flex-col justify-center ml-10 border rounded-2xl p-8">
        <h3 className="text-xl font-semibold  flex justify-center items-center mb-5">
          Create an Account
        </h3>

        <form onSubmit={(e) => e.preventDefault()}>
          <ProfilePhotoSelector images={profilePic} setImages={setProfilePic} />
          <div className=" w-[90%] grid grid-cols-1 md:grid-cols-2  gap-3 ml-5">
            <Input
              type="text"
              label="First Name"
              placeholder="Enter your first name"
              value={firstName}
              onChange={({ target }) => setFirstName(target.value)}
            />
            <Input
              type="text"
              label="Last Name"
              placeholder="Enter your last name"
              value={lastName}
              onChange={({ target }) => setLastName(target.value)}
            />
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
            <Input
              value={adminInviteToken}
              onChange={({ target }) => setAdminInviteToken(target.value)}
              label="Adim Invite Token"
              placeholder="6 Digit Code"
              type="password"
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className=" w-1/2 ml-35 mt-4 flex justify-center items-center bg-blue-500 cursor-pointer text-white px-4 py-2 rounded-lg"
            onClick={handleSignUp}
          >
            SignUp
          </button>
          <p className="text-md ml-35 mt-5 text-gray-600">
            Already an account?{' '}
            <Link
              to="/login"
              className="font-medium  cursor-pointer text-blue-600 hover:text-orange-600"
            >
              Login
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
