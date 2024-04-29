import React, { useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { UserAuthContext } from "../Context/LoginContext";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const { setIsLoggedIn } = useContext(UserAuthContext);
  const handleLogin = async (values, { setSubmitting }) => {
    try {
      const response = await axios.post("http://localhost:5055/Login", values);
      console.log("login successful:", response.data);

      const isadmin = response.data;
      const admin = isadmin.data.isAdmin;

      console.log("serverDAta", admin);
      const { token } = response.data;

      // console.log("Email", response.data.data.email);

      localStorage.setItem("token", token);

      setIsLoggedIn(true);
      if (admin) {
        navigate("/AdminPage");
      } else {
        navigate("/");
      }

      alert("User Login successfully!");
    } catch (error) {
      console.error("Error signing up:", error);
      if (error.response && error.response.status === 401) {
        // Handle 401 Unauthorized error (invalid credentials)
        alert("Invalid credentials");
      } else {
        // Handle other errors
        alert("An error occurred while logging in. Please try again later.");
      }
    } finally {
      setSubmitting(false);
    }
  };
  return (
    <div
      className="container-fluid d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <div
        className="border border-primary p-4 rounded"
        style={{ width: "400px" }}
      >
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={LoginSchema}
          onSubmit={handleLogin}
        >
          <Form className="bg-white shadow p-4 rounded">
            <h1 className="text-center mb-4 font-weight-bold">Login Form</h1>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <Field
                type="email"
                name="email"
                className="form-control"
                placeholder="Enter your email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-danger"
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password:
              </label>
              <Field
                type="password"
                name="password"
                className="form-control"
                placeholder="Enter your password"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-danger"
              />
            </div>
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default Login;
