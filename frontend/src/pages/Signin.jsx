import axios from "axios";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";

export default function Signin() {
  const [values, setValues] = useState({
    username: '',
    password: ''
  });

  const [submitSuccess, setSubmitSuccess] = useState(0)

  const navigate = useNavigate()

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post("http://localhost:3000/api/v1/users/signin", values)
      localStorage.setItem("token", response.data.token)
      setSubmitSuccess(1)
      navigate("/dashboard")
    }
    catch (err) {
      setSubmitSuccess(2)
    }
  };

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });

  };
  return (
    <main className="bg-blue-500 w-dvw h-dvh flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-max md:w-fit bg-white h-auto rounded-md p-8">
        <div className="text-3xl font-bold text-center">Sign In</div>
        <p className="text-md text-center text-gray-500 py-4">
          Enter your credentials to get started.
        </p>
        {submitSuccess == 2 && <p className="text-red-500 font-semibold">Incorrect credentials.</p>}
        <label htmlFor="username" className="text-sm font-semibold">
          Email/Username
        </label>
        <br />
        <input
          type="email"
          name="username"
          id="username"
          placeholder="Enter your username here"
          value={values.username}
          onChange={handleChange}
          onFocusCapture={() => setSubmitSuccess(0)}
          className="border-2 w-full rounded-md p-2 mb-4"
          />
        <label htmlFor="password" className="text-sm font-semibold">
          Password
        </label>
        <br />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Enter your password here"
          value={values.password}
          onChange={handleChange}
          onFocusCapture={() => setSubmitSuccess(0)}
          className="border-2 w-full rounded-md p-2 mb-4"
        />

        <button
          type="submit"
          className="bg-gray-900 text-gray-200 w-full py-2 rounded-md my-2 hover:bg-gray-700"
        >
          Sign In
        </button>
        <p className="text-sm text-center">New here? <NavLink to={'/signup'} className="underline">Sign up</NavLink></p>
        
      </form>
    </main>
  );
}
