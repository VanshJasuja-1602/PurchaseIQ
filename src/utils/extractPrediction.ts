import type { PredictionResult } from '../types/prediction';

/**
 * Robustly parses and extracts the prediction and probability from multiple 
 * possible Databricks Model Serving response formats.
 * 
 * Supported Formats:
 * 1) { "predictions": [1] }
 * 2) { "predictions": [{"prediction": 1, "probability": [0.15, 0.85]}] }
 * 3) { "prediction": 1 }
 * 4) { "outputs": [1] }
 */
export function extractPrediction(response: any): PredictionResult {
  const timestamp = new Date().toLocaleTimeString();
  
  if (!response) {
    throw new Error("Empty response received from the model server.");
  }

  let prediction: number | null = null;
  let probability: number | null = null;

  // Format 1 & 2: predictions array
  if (response.predictions && Array.isArray(response.predictions) && response.predictions.length > 0) {
    const firstObj = response.predictions[0];
    if (typeof firstObj === 'object' && firstObj !== null) {
      // It is an object inside the predictions array: {"prediction": 1, "probability": ...}
      if ('prediction' in firstObj) {
        prediction = Number(firstObj.prediction);
      } else if ('predicted_label' in firstObj) {
        prediction = Number(firstObj.predicted_label);
      } else if ('label' in firstObj) {
        prediction = Number(firstObj.label);
      }

      // Check for probability/probabilities inside the object
      if ('probability' in firstObj) {
        const probVal = firstObj.probability;
        if (Array.isArray(probVal)) {
          // If it is a probability distribution [P_class0, P_class1]
          probability = probVal.length > 1 ? Number(probVal[1]) : Number(probVal[0]);
        } else {
          probability = Number(probVal);
        }
      } else if ('probabilities' in firstObj) {
        const probsVal = firstObj.probabilities;
        if (Array.isArray(probsVal)) {
          probability = probsVal.length > 1 ? Number(probsVal[1]) : Number(probsVal[0]);
        }
      } else if ('confidence' in firstObj) {
        probability = Number(firstObj.confidence);
      }
    } else {
      // It is a simple array of values: [1]
      prediction = Number(firstObj);
    }
  } 
  // Format 3: simple prediction key at root
  else if ('prediction' in response) {
    if (typeof response.prediction === 'object' && response.prediction !== null) {
      if ('prediction' in response.prediction) {
        prediction = Number(response.prediction.prediction);
      }
      if ('probability' in response.prediction) {
        const probVal = response.prediction.probability;
        probability = Array.isArray(probVal) ? Number(probVal[1] || probVal[0]) : Number(probVal);
      }
    } else {
      prediction = Number(response.prediction);
    }
  } 
  // Format 4: outputs array
  else if (response.outputs && Array.isArray(response.outputs) && response.outputs.length > 0) {
    const firstOut = response.outputs[0];
    if (typeof firstOut === 'object' && firstOut !== null) {
      if ('prediction' in firstOut) {
        prediction = Number(firstOut.prediction);
      }
      if ('probability' in firstOut) {
        const probVal = firstOut.probability;
        probability = Array.isArray(probVal) ? Number(probVal[1] || probVal[0]) : Number(probVal);
      }
    } else {
      prediction = Number(firstOut);
    }
  }

  // Look for probabilities at the root level if we didn't find them inside the objects
  if (probability === null) {
    if ('probability' in response) {
      const probVal = response.probability;
      probability = Array.isArray(probVal) ? Number(probVal[1] || probVal[0]) : Number(probVal);
    } else if ('probabilities' in response) {
      const probsVal = response.probabilities;
      probability = Array.isArray(probsVal) ? Number(probsVal[1] || probsVal[0]) : Number(probsVal);
    }
  }

  // Fallback and validation
  if (prediction === null || isNaN(prediction)) {
    throw new Error("Unable to extract prediction from Databricks response format.");
  }

  // Normalize probability to a number between 0 and 1 if present
  if (probability !== null && !isNaN(probability)) {
    // If it's represented as percentage (e.g. 85 instead of 0.85)
    if (probability > 1) {
      probability = probability / 100;
    }
  } else {
    // If probability is missing, we can assign a mock probability based on the prediction for visual gauge representation.
    // However, the spec says: "extractPrediction(response) should safely return prediction value, probability if available, null if missing"
    probability = null;
  }

  return {
    prediction: prediction === 1 ? 1 : 0,
    probability,
    timestamp,
    rawResponse: response
  };
}
