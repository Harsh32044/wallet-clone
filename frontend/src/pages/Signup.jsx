import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Signup() {

    const [values, setValues] = useState({
        firstName: '',
        lastName: '',
        username: '',
        password: ''
    })
    const [message, setMessage] = useState('')

    const [submitSuccess, setSubmitSuccess] = useState(0)

    const navigate = useNavigate()

    const handleChange = (event) => {
        const {name, value} = event.target

        setValues({
            ...values,
            [name] : value
        })
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        try {
          const response = await axios.post("http://localhost:3000/api/v1/users/signup" , values)
          setMessage(response.data.message)
          setSubmitSuccess(1)
          navigate("/signin")
        }
        catch (err) {
          setMessage(err.response.data.error)
          setSubmitSuccess(2)
        }
    }
  return (
    <main className="bg-blue-500 w-dvw h-dvh flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-max md:w-fit bg-white h-auto rounded-md p-8">
        <div className="text-3xl font-bold text-center">Sign Up</div>
        <p className="text-md text-center text-gray-500 py-4">
          Enter your information to create an account.
        </p>
        {submitSuccess == 2 && <p className="text-red-500 font-semibold">{message}</p>}
        <label htmlFor="firstname" className="text-sm font-semibold">
          First Name
        </label>
        <br />
        <input
          type="text"
          name="firstName"
          id="firstName"
          placeholder="John"
          value={values.firstName}
          onChange={handleChange}
          className="border-2 w-full rounded-md p-2 mb-2"
        />
        <label htmlFor="lastName" className="text-sm font-semibold">
          Last Name
        </label>
        <br />
        <input
          type="text"
          name="lastName"
          id="lastName"
          placeholder="Doe"
          value={values.lastName}
          onChange={handleChange}
          className="border-2 w-full rounded-md p-1 mb-2"
        />
        <label htmlFor="email" className="text-sm font-semibold">
          Email/Username
        </label>
        <br />
        <input
          type="email"
          name="username"
          id="username"
          placeholder="johndoe@example.com"
          value={values.username}
          onChange={handleChange}
          className="border-2 w-full rounded-md p-1 mb-2"
        />
        <label htmlFor="password" className="text-sm font-semibold">
          Password
        </label>
        <br />
        <input
          type="password"
          name="password"
          id="password"
          value={values.password}
          onChange={handleChange}
          className="border-2 w-full rounded-md p-1 mb-2"
        />

        <button
          type="submit"
          className="bg-gray-900 text-gray-200 w-full py-2 rounded-md my-2 hover:bg-gray-700"
        >
          Sign Up
        </button>
        <p className="text-sm text-center">Already have an account? <NavLink className="underline" to={'/signin'}>Login</NavLink></p>
        
      </form>
    </main>
  );
}
