import axios from 'axios';

export default async function handler(req, res) {
  // Handle CORS preflight request
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  // Get token from secure server-side environment variables
  const token = process.env.DATABRICKS_TOKEN || process.env.VITE_DATABRICKS_TOKEN;
  
  if (!token) {
    return res.status(500).json({ 
      error: 'Backend authentication token is missing. Please set DATABRICKS_TOKEN in your hosting platform environment variables.' 
    });
  }

  try {
    const response = await axios.post(
      'https://dbc-0907a775-590e.cloud.databricks.com/serving-endpoints/online-shoppers-endpoint/invocations',
      req.body,
      {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        timeout: 120000, // 120 second timeout for cold starts
      }
    );

    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(200).json(response.data);
  } catch (error) {
    console.error('Databricks proxy error:', error.message);
    const status = error.response?.status || 500;
    const data = error.response?.data || { error: error.message };
    
    res.setHeader('Access-Control-Allow-Origin', '*');
    return res.status(status).json(data);
  }
}
