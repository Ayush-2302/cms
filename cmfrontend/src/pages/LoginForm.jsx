import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { loginApi } from "../apiService/authService";
import { Link, useNavigate } from "react-router-dom";

const LoginForm = () => {
  const defaultValue = {
    email: "",
    password: "",
  };

  const navigate = useNavigate();
  const validationSchema = Yup.object({
    email: Yup.string().email("Invalid email address").required("Required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters")
      .required("Required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    const response = await loginApi(values);
    if (response.status === 200) {
      navigate("/cars");
      resetForm();
      window.location.reload();
    }
    console.log("Login Submitted:", values);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-green-500 via-teal-600 to-blue-700">
      <div className="w-full sm:w-11/12 md:w-2/3 lg:w-3/4 p-6 bg-white rounded-xl shadow-lg flex flex-col md:flex-row">
        {/* Left side: Image */}
        <div
          className="md:w-1/2 bg-cover bg-center rounded-l-xl"
          style={{
            backgroundImage:
              "url('https://images.pexels.com/photos/1181249/pexels-photo-1181249.jpeg')",
          }}
        >
          <div className="h-full bg-black bg-opacity-50 rounded-l-xl flex items-center justify-center">
            <h3 className="text-4xl font-bold text-white text-center">
              Welcome Back!
            </h3>
          </div>
        </div>
        {/* form */}
        <div className="md:w-1/2 p-6">
          <h2 className="mb-6 text-3xl font-bold text-center text-gray-900">
            Login
          </h2>
          <Formik
            initialValues={defaultValue}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form className="space-y-6">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email Address
                  </label>
                  <Field
                    className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your email"
                  />
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="mt-2 text-sm text-red-500"
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
                    className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter your password"
                  />
                  <ErrorMessage
                    name="password"
                    component="div"
                    className="mt-2 text-sm text-red-500"
                  />
                </div>

                <div>
                  <button
                    type="submit"
                    className="w-full py-3 px-4 font-bold text-white bg-teal-600 rounded-md hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  >
                    Login
                  </button>
                  <div className="text-center w-full">
                    <Link
                      to="/signup"
                      className="text-teal-600   hover:text-teal-800
                      transition duration-300 ease-in-out"
                    >
                      Don't have an account?
                    </Link>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
