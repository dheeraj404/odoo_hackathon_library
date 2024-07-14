import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Modal from "react-modal";
import axios from "axios";

export default function Dashboard() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [searchResults, setSearchResults] = useState([]);

  const getUserProfile = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/user/profile", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      if (data.success) {
        setUserData(data.data);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleAddLibrarian = async (values) => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/user/register-new-user",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify({
            ...values,
            library_code: userData.library.library_code,
            role: "librarian",
          }),
        }
      );
      const data = await response.json();
      if (data.success) {
        alert("Librarian added successfully");
        setModalIsOpen(false);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleSearch = async (searchType, searchValue) => {
    const token = localStorage.getItem("token");
    try {
      const endpointMap = {
        title: "search-books-by-title",
        author: "search-books-by-author",
        genre: "search-books-by-genre",
      };

      const response = await axios.get(
        `http://localhost:5000/api/book/${endpointMap[searchType]}/${searchValue}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.data.success) {
        setSearchResults(response.data.data);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleGetAllBooks = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.get(
        "http://localhost:5000/api/book/get-all-books",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        setSearchResults(response.data.data);
      } else {
        console.log(response.data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    } else {
      getUserProfile();
    }
  }, [navigate]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <header className="bg-indigo-600 text-white p-4">
        <h1 className="text-3xl font-bold">Library Management Dashboard</h1>
      </header>
      <main className="flex flex-1 p-6">
        <div className="w-full max-w-6xl mx-auto bg-white shadow-lg rounded-lg p-6 space-y-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Welcome, Admin!
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-4 shadow rounded-lg">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                User Information
              </h3>
              <p className="text-gray-600">
                <strong>Name:</strong> {userData.name}
              </p>
              <p className="text-gray-600">
                <strong>Email:</strong> {userData.email}
              </p>
              <p className="text-gray-600">
                <strong>Role:</strong> {userData.role}
              </p>
            </div>
            <div className="bg-gray-50 p-4 shadow rounded-lg">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                Library Information
              </h3>
              <p className="text-gray-600">
                <strong>Library Name:</strong> {userData.library.name}
              </p>
              <p className="text-gray-600">
                <strong>Address:</strong> {userData.library.address}
              </p>
              <p className="text-gray-600">
                <strong>Pincode:</strong> {userData.library.pincode}
              </p>
              <p className="text-gray-600">
                <strong>Library Code:</strong> {userData.library.library_code}
              </p>
            </div>
          </div>
          {userData.role === "admin" && (
            <div>
              <button
                onClick={() => setModalIsOpen(true)}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg"
              >
                Add Librarian
              </button>
            </div>
          )}
          <div className="my-6">
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              Search Books
            </h3>
            <div className="flex space-x-4 mb-4">
              <input
                type="text"
                id="search"
                placeholder="Search books..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              />
              <button
                onClick={() =>
                  handleSearch("title", document.getElementById("search").value)
                }
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Search by Title
              </button>
              <button
                onClick={() =>
                  handleSearch(
                    "author",
                    document.getElementById("search").value
                  )
                }
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Search by Author
              </button>
              <button
                onClick={() =>
                  handleSearch("genre", document.getElementById("search").value)
                }
                className="px-4 py-2 bg-blue-500 text-white rounded-lg"
              >
                Search by Genre
              </button>
              <button
                onClick={handleGetAllBooks}
                className="px-4 py-2 bg-green-500 text-white rounded-lg"
              >
                Get All Books
              </button>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {searchResults.map((book) => (
                <div
                  key={book._id}
                  className="bg-gray-50 p-4 shadow rounded-lg"
                >
                  <img
                    src={book.small_icon}
                    alt={book.title}
                    className="mb-4 w-full h-auto"
                  />
                  <h4 className="text-lg font-semibold text-gray-700">
                    {book.title}
                  </h4>
                  <p className="text-gray-600">
                    <strong>Authors:</strong> {book.authors.join(", ")}
                  </p>
                  <p className="text-gray-600">
                    <strong>Genre:</strong> {book.genre}
                  </p>
                  <p className="text-gray-600">
                    <strong>Description:</strong> {book.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-gray-200 text-gray-700 p-4 text-center">
        <p>
          &copy; {new Date().getFullYear()} Library Management System. All
          rights reserved.
        </p>
      </footer>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        className="flex items-center justify-center min-h-screen"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50"
      >
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Add Librarian
          </h2>
          <Formik
            initialValues={{ name: "", email: "", password: "" }}
            validationSchema={Yup.object({
              name: Yup.string().required("Required"),
              email: Yup.string()
                .email("Invalid email address")
                .required("Required"),
              password: Yup.string()
                .min(8, "Password must be at least 8 characters")
                .required("Required"),
            })}
            onSubmit={handleAddLibrarian}
          >
            {({ isSubmitting }) => (
              <Form className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Name
                  </label>
                  <Field
                    type="text"
                    name="name"
                    id="name"
                    className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="mt-1 text-sm text-red-600"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>
                  <Field
                    type="email"
                    name="email"
                    id="email"
                    className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="mt-1 text-sm text-red-600"
                  />
                </div>
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>
                  <Field
                    type="password"
                    name="password"
                    id="password"
                    className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="mt-1 text-sm text-red-600"
                  />
                </div>
                <div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full px-4 py-2 text-white bg-indigo-600 rounded-lg shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    {isSubmitting ? "Adding..." : "Add Librarian"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </Modal>
    </div>
  );
}
