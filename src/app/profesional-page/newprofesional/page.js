// src/app/register-professional/page.js
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import fetchGraphQL from '../../../lib/graphql';

const REGISTER_PROFESSIONAL_MUTATION = `
  mutation RegisterProfessional($name: String!, $lastName: String!, $phone: String!, $userId: String!) {
    createProfessional(createProfessional: { name: $name, lastName: $lastName, phone: $phone, userId: $userId }) {
      id
      name
      lastName
    }
  }
`;

const GET_SERVICES_QUERY = `
  query GetAllServices {
    getAllServices {
      id
      title
      description
      contact
      category
    }
  }
`;

const RegisterProfessional = () => {
  const router = useRouter();
  const [name, setName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [userId, setUserId] = useState(''); // Esto debería ser el ID del usuario registrado
  const [token, setToken] = useState(null);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [services, setServices] = useState([]);

  useEffect(() => {
    // Obtener el token del almacenamiento local
    const storedToken = localStorage.getItem('token');
    if (!storedToken) {
      router.push('/login'); // Redirigir al login si no hay token
      return;
    }
    setToken(storedToken);

    async function fetchServices() {
      try {
        const { data, errors } = await fetchGraphQL(GET_SERVICES_QUERY, {}, storedToken);
        if (errors) {
          console.error("Error fetching services:", errors[0].message);
        } else {
          setServices(data.getAllServices);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    }

    fetchServices();
  }, [router]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { data, errors } = await fetchGraphQL(REGISTER_PROFESSIONAL_MUTATION, {
        name,
        lastName,
        phone,
        userId,
      }, token);

      if (errors) {
        setError(errors[0].message);
        setSuccess(null);
      } else {
        setSuccess('Professional registered successfully!');
        setError(null);
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
      setSuccess(null);
    }
  };

  return (
    <div>
      <h1>Register as Professional</h1>
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {success && <p style={{ color: 'green' }}>{success}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="User ID"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          required
        />
        <button type="submit">Register</button>
      </form>
      
      <h2>Available Services</h2>
      <ul>
        {services.map(service => (
          <li key={service.id}>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
            <p>Contact: {service.contact}</p>
            <p>Category: {service.category}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RegisterProfessional;
