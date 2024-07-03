// pages/login.js
"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import fetchGraphQL from "../../../lib/graphql";

const LOGIN_MUTATION = `
  mutation Login($email: String!, $password: String!) {
    login(loginInput: { email: $email, password: $password }) {
      token
    }
  }
`;

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data } = await fetchGraphQL(LOGIN_MUTATION, {
        email,
        password,
      });

      // Assuming your API returns a token upon successful login
      const token = data.login.token;

      // Store token in localStorage or session storage for authentication
      localStorage.setItem("token", token);
      console.log(email,password)
      // Redirect to dashboard or another page upon successful login
      router.push("/");
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h1 className="text-2xl font-bold text-center">Login</h1>
        {error && <p className="text-red-500">{`Error: ${error}`}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
          />
          <button
            type="submit"
            className="w-full py-2 text-white bg-blue-500 rounded hover:bg-blue-600"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
