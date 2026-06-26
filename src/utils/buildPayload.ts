import type { RawFormInput, DatabricksPayload, DatabricksRecord } from '../types/prediction';
import { calculateEngineeredFeatures } from './featureEngineering';
import { encodeMonth, encodeVisitorType } from './encoding';

/**
 * Builds the final Databricks Model Serving payload from raw form inputs.
 * Internally runs feature engineering and one-hot encoding, converting weekend
 * boolean to numeric 0/1 and categorical fields to numeric one-hot columns.
 */
export function buildDatabricksPayload(input: RawFormInput): DatabricksPayload {
  const engineered = calculateEngineeredFeatures(input);
  const months = encodeMonth(input.Month);
  const visitorTypes = encodeVisitorType(input.VisitorType);

  const record: DatabricksRecord = {
    Administrative: Number(input.Administrative),
    Administrative_Duration: Number(input.Administrative_Duration),
    Informational: Number(input.Informational),
    Informational_Duration: Number(input.Informational_Duration),
    ProductRelated: Number(input.ProductRelated),
    ProductRelated_Duration: Number(input.ProductRelated_Duration),
    BounceRates: Number(input.BounceRates),
    ExitRates: Number(input.ExitRates),
    PageValues: Number(input.PageValues),
    SpecialDay: Number(input.SpecialDay),
    OperatingSystems: Number(input.OperatingSystems),
    Browser: Number(input.Browser),
    Region: Number(input.Region),
    TrafficType: Number(input.TrafficType),
    Weekend: input.Weekend ? 1 : 0,
    ...engineered,
    ...months,
    ...visitorTypes,
  };

  return {
    dataframe_records: [record],
  };
}
