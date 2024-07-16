import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
function Signup() {
    const navigate = useNavigate();
  const handleSignup = async (values) => {
    try {
      const response = await axios.post("http://localhost:5000/api/user/register-new-user", values);
      if (response.data.success) {
        alert("Signup successful! Please log in.");
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      } else {
        alert("Signup failed: " + response.data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800">Sign Up</h2>
        <Formik
          initialValues={{ name: "", email: "", password: "", role: "student", library_code: "" }}
          validationSchema={Yup.object({
            name: Yup.string().required("Required"),
            email: Yup.string().email("Invalid email address").required("Required"),
            password: Yup.string().min(8, "Password must be at least 8 characters").required("Required"),
            library_code: Yup.string().required("Required"),
          })}
          onSubmit={handleSignup}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <Field
                  type="text"
                  name="name"
                  id="name"
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <ErrorMessage name="name" component="div" className="mt-1 text-sm text-red-600" />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <ErrorMessage name="email" component="div" className="mt-1 text-sm text-red-600" />
              </div>
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <Field
                  type="password"
                  name="password"
                  id="password"
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <ErrorMessage name="password" component="div" className="mt-1 text-sm text-red-600" />
              </div>
              <div>
                <label htmlFor="library_code" className="block text-sm font-medium text-gray-700">Library Code</label>
                <Field
                  type="text"
                  name="library_code"
                  id="library_code"
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                />
                <ErrorMessage name="library_code" component="div" className="mt-1 text-sm text-red-600" />
              </div>
              <div>
                <label htmlFor="role" className="block text-sm font-medium text-gray-700">Role</label>
                <Field
                  type="text"
                  name="role"
                  id="role"
                  disabled
                  className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm bg-gray-200 sm:text-sm"
                />
                <ErrorMessage name="role" component="div" className="mt-1 text-sm text-red-600" />
              </div>
              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full px-4 py-2 text-white bg-indigo-600 rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  {isSubmitting ? "Signing up..." : "Sign Up"}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default Signup;
