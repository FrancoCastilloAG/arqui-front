// src/app/register/page.js
'use client';

import { useState } from 'react';
import fetchGraphQL from '../../../lib/graphql';

const REGISTER_MUTATION = `
  mutation Register($name: String!, $email: String!, $password: String!) {
    register(registerInput: { name: $name, email: $email, password: $password }) {
      id
      name
      email
    }
  }
`;

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data, errors } = await fetchGraphQL(REGISTER_MUTATION, {
        name,
        email,
        password,
      });

      if (errors) {
        setError(errors[0].message);
        setSuccess(null);
      } else {
        setSuccess('User registered successfully!');
        router.push('/login');
        setError(null);
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
      setSuccess(null);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
      <h1 className="text-2xl font-bold text-center">Register</h1>
      {error && <p className="text-red-500">{`Error: ${error}`}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
        />
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
        <button type="submit" className="w-full py-2 text-white bg-blue-500 rounded hover:bg-blue-600">
          Register
        </button>
      </form>
    </div>
  </div>
  );
};

export default Register;
