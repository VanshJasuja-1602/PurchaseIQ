import axios from 'axios';

export const handler = async (event, context) => {
  // Handle CORS preflight request
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
        'Access-Control-Allow-Methods': 'POST, OPTIONS',
      },
      body: '',
    };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  // Get token and url from secure server-side environment variables
  const token = process.env.DATABRICKS_TOKEN || process.env.VITE_DATABRICKS_TOKEN;
  const url = process.env.DATABRICKS_URL || process.env.VITE_DATABRICKS_URL || 'https://dbc-0907a775-590e.cloud.databricks.com/serving-endpoints/online-shoppers-endpoint/invocations';
  
  if (!token) {
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: 'Backend authentication token is missing. Please set DATABRICKS_TOKEN in your hosting platform environment variables.',
      }),
    };
  }

  try {
    const payload = JSON.parse(event.body || '{}');
    const response = await axios.post(
      url,
      payload,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        timeout: 120000, // 120 second timeout for cold starts
      }
    );

    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(response.data),
    };
  } catch (error) {
    console.error('Databricks proxy error:', error.message);
    const status = error.response?.status || 500;
    const data = error.response?.data || { error: error.message };

    return {
      statusCode: status,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    };
  }
};
