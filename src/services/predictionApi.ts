import axios from 'axios';
import type { DatabricksPayload, PredictionResult } from '../types/prediction';
import { extractPrediction } from '../utils/extractPrediction';

/**
 * ============================================================================
 * SECURITY WARNING:
 * For production environments, do NOT expose the Databricks API token directly 
 * in the frontend. The browser environment makes these tokens easily accessible 
 * to end-users (inspecting network tabs or JS bundles). 
 * 
 * Recommendation: Set up a secure backend proxy server that forwards prediction 
 * requests and injects the authorization token server-side.
 * ============================================================================
 */

const databricksUrl = import.meta.env.VITE_DATABRICKS_URL || '/api/predict';
const databricksToken = import.meta.env.VITE_DATABRICKS_TOKEN || '';

export async function predictPurchase(
  payload: DatabricksPayload,
  retries = 3,
  delayMs = 1500
): Promise<PredictionResult> {
  if (!databricksUrl) {
    throw new Error("Databricks Endpoint URL is missing. Set VITE_DATABRICKS_URL in your environment.");
  }

  // If the URL is absolute (external), we need the token on the client side.
  // If it's a relative proxy path (like /api/predict), the proxy server injects the token.
  const isRelative = databricksUrl.startsWith('/');
  if (!isRelative && !databricksToken) {
    throw new Error("Databricks Authentication Token is missing. Set VITE_DATABRICKS_TOKEN in your environment.");
  }

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
  };

  if (databricksToken) {
    headers['Authorization'] = `Bearer ${databricksToken}`;
  }

  let lastError: any = null;

  for (let attempt = 0; attempt <= retries; attempt++) {
    try {
      if (attempt > 0) {
        console.warn(`Databricks API attempt ${attempt} failed. Retrying in ${delayMs}ms (retry ${attempt}/${retries})...`);
        await new Promise((resolve) => setTimeout(resolve, delayMs));
      }

      const response = await axios.post(
        databricksUrl,
        payload,
        {
          headers,
          timeout: 120000, // 120 seconds timeout to accommodate cold starts
        }
      );

      return extractPrediction(response.data);
    } catch (error: any) {
      console.error(`Databricks API Error (Attempt ${attempt + 1}/${retries + 1}):`, error);
      lastError = error;
      
      // If the error is a client-side invalid request or auth issue, fail fast instead of retrying
      if (error.response && (error.response.status === 400 || error.response.status === 401 || error.response.status === 403)) {
        break;
      }
    }
  }

  // Extract a readable error message for the collapsible developer panel
  let detailedError = "No additional error details available.";
  if (lastError.response) {
    // Server responded with non-2xx code
    detailedError = `Status: ${lastError.response.status}\nData: ${JSON.stringify(lastError.response.data, null, 2)}`;
  } else if (lastError.request) {
    // Request was made but no response received
    detailedError = "Request was sent but no response was received from Databricks. Check CORS configurations, URL accuracy, or network status.";
  } else {
    // Something happened setting up the request
    detailedError = lastError.message;
  }
  
  throw {
    message: "Prediction service is currently unavailable. Please check your endpoint URL or token.",
    details: detailedError,
    payload: JSON.stringify(payload, null, 2),
  };
}
