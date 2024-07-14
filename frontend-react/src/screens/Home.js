import React from "react";

export default function Home() {
  return (
    <div className="flex flex-col w-full items-center p-6 bg-gray-100 min-h-screen justify-center">
      <div className="flex flex-col items-center mb-8">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">Welcome to Library Management System</h1>
        <p className="text-xl text-gray-600 text-center max-w-2xl">
          This is a library management system. You can manage your library here.
        </p>
      </div>

      {/* Link to login and register your library or sign up as student in your library */}
      <div className="flex flex-row justify-center gap-8 mb-12">
        <div className="flex flex-col items-center p-6 bg-white shadow-lg rounded-lg w-64">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Login</h2>
          <p className="text-gray-600 mb-4 text-center">Already a user? Login here</p>
          <a href="/login" className="text-blue-500 underline text-lg font-medium">
            Login
          </a>
        </div>

        <div className="flex flex-col items-center p-6 bg-white shadow-lg rounded-lg w-64">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Admin</h2>
          <p className="text-gray-600 mb-4 text-center">If you are an admin, you can register your library here.</p>
          <a href="/register" className="text-blue-500 underline text-lg font-medium">
            Register
          </a>
        </div>

        <div className="flex flex-col items-center p-6 bg-white shadow-lg rounded-lg w-64">
          <h2 className="text-2xl font-semibold text-gray-700 mb-2">Student</h2>
          <p className="text-gray-600 mb-4 text-center">If you are a student, you can sign up here.</p>
          <a href="/signup" className="text-blue-500 underline text-lg font-medium">
            Sign Up
          </a>
        </div>
      </div>

      <div className="flex flex-col items-center p-6 bg-white shadow-lg rounded-lg max-w-lg">
        <h2 className="text-2xl font-semibold text-gray-700 mb-4">Features</h2>
        <ul className="text-gray-600 space-y-2 list-disc list-inside">
          <li>Manage books</li>
          <li>Manage users</li>
          <li>Manage libraries</li>
          <li>Issue books</li>
          <li>Return books</li>
        </ul>
      </div>
    </div>
  );
}
