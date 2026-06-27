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

  // Get token and url from secure server-side environment variables
  const token = process.env.DATABRICKS_TOKEN || process.env.VITE_DATABRICKS_TOKEN;
  const url = process.env.DATABRICKS_URL || process.env.VITE_DATABRICKS_URL || 'https://dbc-0907a775-590e.cloud.databricks.com/serving-endpoints/online-shoppers-endpoint/invocations';
  
  if (!token) {
    return res.status(500).json({ 
      error: 'Backend authentication token is missing. Please set DATABRICKS_TOKEN in your hosting platform environment variables.' 
    });
  }

  const retries = 3;
  const delayMs = 1500;
  let lastError = null;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      if (attempt > 0) {
        console.warn(`Databricks serverless proxy attempt ${attempt} failed. Retrying in ${delayMs}ms...`);
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }

      const response = await axios.post(
        url,
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
      console.error(`Databricks proxy error (Attempt ${attempt + 1}/${retries + 1}):`, error.message);
      lastError = error;

      // Fail fast on client/auth errors (400, 401, 403)
      if (error.response && (error.response.status === 400 || error.response.status === 401 || error.response.status === 403)) {
        break;
      }
    }
  }

  const status = lastError.response?.status || 500;
  const data = lastError.response?.data || { error: lastError.message };
  
  res.setHeader('Access-Control-Allow-Origin', '*');
  return res.status(status).json(data);
}
