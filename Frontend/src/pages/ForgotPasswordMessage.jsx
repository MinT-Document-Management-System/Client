import React from 'react';
import { useNavigate } from 'react-router-dom';

const ForgotPasswordMessage = () => {
    const navigate= useNavigate();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-semibold text-green-600 mb-6">
        Email Sent Successfully!
      </h1>
      <p className="text-lg text-gray-700 mb-4">
        A verification email has been sent to your email address. Please check your inbox and verify your account.
      </p>
      <p className="text-md text-gray-500 mb-8">
        If you don't see the email, check your spam or junk folder.
      </p>
      <button
        className="px-6 py-2 text-white bg-green-600 rounded-md hover:bg-green-700 transition"
        onClick={() =>navigate("/ForgotPassword") }
      >
        Resend Email
      </button>
    </div>
  );
};

export default ForgotPasswordMessage;
