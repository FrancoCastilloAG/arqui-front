// lib/graphql.js
async function fetchGraphQL(query, variables = {}, token = null) {
  const headers = {
    'Content-Type': 'application/json',
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch('http://localhost:3000/graphql', {
    method: 'POST',
    headers,
    body: JSON.stringify({
      query,
      variables,
    }),
  });

  return await response.json();
}

export default fetchGraphQL;
