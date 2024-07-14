import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import OtpInput from 'react-otp-input';

function RegisterLibrary() {
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState('');

  const initialValues = {
    library_name: '',
    admin_name: '',
    address: '',
    pincode: '',
    email: '',
    password: '',
    confirmPassword: '',
  };

  const validationSchema = Yup.object({
    library_name: Yup.string().required('Required'),
    admin_name: Yup.string().required('Required'),
    address: Yup.string().required('Required'),
    pincode: Yup.string().required('Required'),
    email: Yup.string().email('Invalid email address').required('Required'),
    password: Yup.string().min(8, 'Password must be at least 8 characters').required('Required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Required'),
  });

  const handleSendOtp = async (values) => {
    try {
      await axios.post('http://localhost:5000/api/otp/send-otp', { email: values.email });
      setStep(2);
    } catch (error) {
      console.error('Error sending OTP:', error);
    }
  };

  const handleSubmit = async (values) => {
    try {
      const response = await axios.post('http://localhost:5000/api/signup', {
        ...values,
        otp,
      });
      console.log('Sign up successful:', response.data);
    } catch (error) {
      console.error('Error signing up:', error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800">Register Library</h2>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={step === 1 ? handleSendOtp : handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-6">
              {step === 1 ? (
                <>
                  <div>
                    <label htmlFor="library_name" className="block text-sm font-medium text-gray-700">Library Name</label>
                    <Field
                      type="text"
                      name="library_name"
                      id="library_name"
                      className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <ErrorMessage name="library_name" component="div" className="mt-1 text-sm text-red-600" />
                  </div>

                  <div>
                    <label htmlFor="admin_name" className="block text-sm font-medium text-gray-700">Admin Name</label>
                    <Field
                      type="text"
                      name="admin_name"
                      id="admin_name"
                      className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <ErrorMessage name="admin_name" component="div" className="mt-1 text-sm text-red-600" />
                  </div>

                  <div>
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700">Address</label>
                    <Field
                      type="text"
                      name="address"
                      id="address"
                      className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <ErrorMessage name="address" component="div" className="mt-1 text-sm text-red-600" />
                  </div>

                  <div>
                    <label htmlFor="pincode" className="block text-sm font-medium text-gray-700">Pincode</label>
                    <Field
                      type="text"
                      name="pincode"
                      id="pincode"
                      className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <ErrorMessage name="pincode" component="div" className="mt-1 text-sm text-red-600" />
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
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                    <Field
                      type="password"
                      name="confirmPassword"
                      id="confirmPassword"
                      className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                    <ErrorMessage name="confirmPassword" component="div" className="mt-1 text-sm text-red-600" />
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-4 py-2 text-white bg-indigo-600 rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      {isSubmitting ? 'Sending OTP...' : 'Next'}
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <label htmlFor="otp" className="block text-sm font-medium text-gray-700">OTP</label>
                    <OtpInput
                      value={otp}
                      onChange={setOtp}
                      numInputs={6}
                      separator={<span>-</span>}
                      inputStyle="w-10 h-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                      isInputNum
                    />
                  </div>

                  <div>
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full px-4 py-2 mt-4 text-white bg-indigo-600 rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                      {isSubmitting ? 'Signing up...' : 'Sign Up'}
                    </button>
                  </div>
                </>
              )}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default RegisterLibrary;
