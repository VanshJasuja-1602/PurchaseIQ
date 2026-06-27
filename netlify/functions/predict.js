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

  const payload = JSON.parse(event.body || '{}');
  const retries = 3;
  const delayMs = 1500;
  let lastError = null;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      if (attempt > 0) {
        console.warn(`Databricks Netlify proxy attempt ${attempt} failed. Retrying in ${delayMs}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }

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
      console.error(`Databricks Netlify proxy error (Attempt ${attempt + 1}/${retries + 1}):`, error.message);
      lastError = error;

      // Fail fast on client/auth errors (400, 401, 403)
      if (error.response && (error.response.status === 400 || error.response.status === 401 || error.response.status === 403)) {
        break;
      }
    }
  }

  const status = lastError.response?.status || 500;
  const data = lastError.response?.data || { error: lastError.message };

  return {
    statusCode: status,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  };
};
