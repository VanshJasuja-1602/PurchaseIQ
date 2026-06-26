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

export async function predictPurchase(payload: DatabricksPayload): Promise<PredictionResult> {
  if (!databricksUrl) {
    throw new Error("Databricks Endpoint URL is missing. Set VITE_DATABRICKS_URL in your environment.");
  }

  // If the URL is absolute (external), we need the token on the client side.
  // If it's a relative proxy path (like /api/predict), the proxy server injects the token.
  const isRelative = databricksUrl.startsWith('/');
  if (!isRelative && !databricksToken) {
    throw new Error("Databricks Authentication Token is missing. Set VITE_DATABRICKS_TOKEN in your environment.");
  }

  try {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (databricksToken) {
      headers['Authorization'] = `Bearer ${databricksToken}`;
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
    console.error("Databricks API Error:", error);
    
    // Extract a readable error message for the collapsible developer panel
    let detailedError = "No additional error details available.";
    if (error.response) {
      // Server responded with non-2xx code
      detailedError = `Status: ${error.response.status}\nData: ${JSON.stringify(error.response.data, null, 2)}`;
    } else if (error.request) {
      // Request was made but no response received
      detailedError = "Request was sent but no response was received from Databricks. Check CORS configurations, URL accuracy, or network status.";
    } else {
      // Something happened setting up the request
      detailedError = error.message;
    }
    
    throw {
      message: "Prediction service is currently unavailable. Please check your endpoint URL or token.",
      details: detailedError,
      payload: JSON.stringify(payload, null, 2),
    };
  }
}
