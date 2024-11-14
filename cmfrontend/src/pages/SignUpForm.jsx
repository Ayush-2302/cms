import React from "react";
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import { signUpApi } from "../apiService/authService";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
  const formFields = [
    {
      name: "username",
      type: "text",
      label: "Username",
    },
    {
      name: "email",
      type: "email",
      label: "Email Address",
    },
    {
      name: "password",
      type: "password",
      label: "Password",
    },
  ];
  const navigate = useNavigate(); 

  const defaultValue = {
    username: "",
    email: "",
    password: "",
  };

  const validationSchema = Yup.object({
    username: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    password: Yup.string()
      .required("Required")
      .min(8, "Password must be at least 8 characters"),
    email: Yup.string().email("Invalid email address").required("Required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    const response = await signUpApi(values);
    if (response.status === 201) {
      navigate("/login");
      resetForm();
    }

    console.log(response);
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-700">
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
              Join Us Today!
            </h3>
          </div>
        </div>

        {/* Right side: SignUp Form */}
        <div className="md:w-1/2 p-6 flex flex-col justify-center">
          <h2 className="mb-6 text-3xl font-bold text-center text-gray-900">
            Sign Up
          </h2>
          <Formik
            initialValues={defaultValue}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {() => (
              <Form className="space-y-6">
                {formFields.map((item, index) => (
                  <div key={index}>
                    <label
                      htmlFor={item.name}
                      className="block text-sm font-medium text-gray-700"
                    >
                      {item.label}
                    </label>
                    <Field
                      className="w-full px-4 py-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      type={item.type}
                      name={item.name}
                      id={item.name}
                      placeholder={item.label}
                    />
                    <ErrorMessage
                      name={item.name}
                      component="div"
                      className="mt-2 text-sm text-red-500"
                    />
                  </div>
                ))}
                <div>
                  <button
                    type="submit"
                    className="w-full py-3 px-4 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    Sign Up
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
