// Types for raw user input from form
export interface RawFormInput {
  Administrative: number;
  Administrative_Duration: number;
  Informational: number;
  Informational_Duration: number;
  ProductRelated: number;
  ProductRelated_Duration: number;
  BounceRates: number;
  ExitRates: number;
  PageValues: number;
  SpecialDay: number;
  OperatingSystems: number;
  Browser: number;
  Region: number;
  TrafficType: number;
  Weekend: boolean; // Converted to 0/1 internally
  Month: string; // Dropdown value
  VisitorType: string; // Dropdown value
}

// Client-side engineered features
export interface EngineeredFeatures {
  TotalPages: number;
  TotalDuration: number;
  ProductFocusRatio: number;
  ProductTimeRatio: number;
  ExitBounceDiff: number;
}

// One-hot encoded months (0 or 1 values)
export interface EncodedMonth {
  Month_Aug: number; // 0 | 1
  Month_Dec: number; // 0 | 1
  Month_Feb: number; // 0 | 1
  Month_Jul: number; // 0 | 1
  Month_June: number; // 0 | 1
  Month_Mar: number; // 0 | 1
  Month_May: number; // 0 | 1
  Month_Nov: number; // 0 | 1
  Month_Oct: number; // 0 | 1
  Month_Sep: number; // 0 | 1
}

// One-hot encoded visitor types (0 or 1 values)
export interface EncodedVisitorType {
  VisitorType_New_Visitor: number; // 0 | 1
  VisitorType_Other: number; // 0 | 1
  VisitorType_Returning_Visitor: number; // 0 | 1
}

// Complete record expected by the Databricks model schema
export interface DatabricksRecord {
  Administrative: number;
  Administrative_Duration: number;
  Informational: number;
  Informational_Duration: number;
  ProductRelated: number;
  ProductRelated_Duration: number;
  BounceRates: number;
  ExitRates: number;
  PageValues: number;
  SpecialDay: number;
  OperatingSystems: number;
  Browser: number;
  Region: number;
  TrafficType: number;
  Weekend: number; // 0 | 1
  TotalPages: number;
  TotalDuration: number;
  ProductFocusRatio: number;
  ProductTimeRatio: number;
  ExitBounceDiff: number;
  Month_Aug: number;
  Month_Dec: number;
  Month_Feb: number;
  Month_Jul: number;
  Month_June: number;
  Month_Mar: number;
  Month_May: number;
  Month_Nov: number;
  Month_Oct: number;
  Month_Sep: number;
  VisitorType_New_Visitor: number;
  VisitorType_Other: number;
  VisitorType_Returning_Visitor: number;
}

// Exact payload structure for Databricks Model Serving
export interface DatabricksPayload {
  dataframe_records: DatabricksRecord[];
}

// Prediction output
export interface PredictionResult {
  prediction: number; // 0 or 1
  probability: number | null; // probability if available, otherwise null
  timestamp: string;
  rawResponse?: any;
}
