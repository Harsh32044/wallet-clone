import { useState } from "react";
import { NavLink } from "react-router-dom";

export default function Signin() {
  const [values, setValues] = useState({
    username: '',
    password: ''
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(values);
  };

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });

    console.log(values);
  };
  return (
    <main className="bg-blue-500 w-dvw h-dvh flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-max md:w-fit bg-white h-auto rounded-md p-8">
        <div className="text-3xl font-bold text-center">Sign In</div>
        <p className="text-md text-center text-gray-500 py-4">
          Enter your credentials to get started.
        </p>

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
          className="border-2 w-full rounded-md p-2 mb-4"
        />

        <button
          type="submit"
          className="bg-gray-900 text-gray-200 w-full py-2 rounded-md my-2 hover:bg-gray-700"
        >
          Sign In
        </button>
        <p className="text-sm text-center">New here? <NavLink to={'/signup'}>Login</NavLink></p>
        
      </form>
    </main>
  );
}
