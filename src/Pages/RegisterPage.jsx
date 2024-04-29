import React from "react"
import { Formik, Form, Field, ErrorMessage } from "formik"
import * as Yup from "yup"

import axios from "axios"

const SignupSchema = Yup.object().shape({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .required("Password is required")
    .matches(
      /^(?=.[A-Z])(?=.\d).{6,}$/,
      "Password must contain at least one uppercase letter and one number"
    ),
})

const Register = () => {
  const handleSignup = async (values) => {
    try {
      const token = localStorage.getItem("token")
      const response = await axios.post(
        "http://localhost:5055/Register",
        values,
        {
          headers: {
            authorization: `bearer ${token}`,
          },
        }
      )

      // If registration is successful
      console.log("Signup successful:", response.data)
      alert("User registered successfully!")
    } catch (error) {}
  }

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <h1 className="text-2xl mb-4 font-bold">Register User</h1>
        <Formik
          initialValues={{
            firstName: "",
            lastName: "",
            email: "",
            password: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={handleSignup}
        >
          {({ errors, touched }) => (
            <Form>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="firstName"
                >
                  First Name:
                </label>
                <Field
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.firstName && touched.firstName
                      ? "border-red-500"
                      : ""
                  }`}
                  type="text"
                  name="firstName"
                  placeholder="Enter your first name"
                />
                <ErrorMessage
                  className="text-red-500 text-xs italic"
                  name="firstName"
                  component="div"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="lastName"
                >
                  Last Name:
                </label>
                <Field
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.lastName && touched.lastName ? "border-red-500" : ""
                  }`}
                  type="text"
                  name="lastName"
                  placeholder="Enter your last name"
                />
                <ErrorMessage
                  className="text-red-500 text-xs italic"
                  name="lastName"
                  component="div"
                />
              </div>
              <div className="mb-4">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="email"
                >
                  Email:
                </label>
                <Field
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.email && touched.email ? "border-red-500" : ""
                  }`}
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                />
                <ErrorMessage
                  className="text-red-500 text-xs italic"
                  name="email"
                  component="div"
                />
              </div>
              <div className="mb-6">
                <label
                  className="block text-gray-700 text-sm font-bold mb-2"
                  htmlFor="password"
                >
                  Password:
                </label>
                <Field
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
                    errors.password && touched.password ? "border-red-500" : ""
                  }`}
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                />
                <ErrorMessage
                  className="text-red-500 text-xs italic"
                  name="password"
                  component="div"
                />
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="submit"
              >
                Register
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

export default Register