// pages/index.js
"use client"
import { useState, useEffect } from 'react';
import Link from 'next/link';
import fetchGraphQL from '../lib/graphql';

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

const Home = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
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
  }, []);

  return (
    <div>
      <h1>Welcome to our Services</h1>
      <ul>
        {services.map(service => (
          <li key={service.id}>
            <h2>{service.title}</h2>
            <p>{service.description}</p>
            <p>Contact: {service.contact}</p>
            <p>Category: {service.category}</p>
          </li>
        ))}
      </ul>

      <Link href="/register-professional">
        Create Professional Profile
      </Link>
    </div>
  );
};

export default Home;
