import type { RawFormInput, EngineeredFeatures } from '../types/prediction';

/**
 * Calculates engineered features from raw input behavior metrics.
 * 
 * Logic details:
 * - TotalPages = Administrative + Informational + ProductRelated
 * - TotalDuration = Administrative_Duration + Informational_Duration + ProductRelated_Duration
 * - ProductFocusRatio = ProductRelated / TotalPages (0 if TotalPages is 0)
 * - ProductTimeRatio = ProductRelated_Duration / ProductRelated (0 if ProductRelated is 0)
 * - ExitBounceDiff = ExitRates - BounceRates
 */
export function calculateEngineeredFeatures(input: RawFormInput): EngineeredFeatures {
  const {
    Administrative,
    Administrative_Duration,
    Informational,
    Informational_Duration,
    ProductRelated,
    ProductRelated_Duration,
    BounceRates,
    ExitRates,
  } = input;

  const TotalPages = Administrative + Informational + ProductRelated;
  const TotalDuration = Administrative_Duration + Informational_Duration + ProductRelated_Duration;

  const ProductFocusRatio = TotalPages > 0 ? ProductRelated / TotalPages : 0;
  const ProductTimeRatio = ProductRelated > 0 ? ProductRelated_Duration / ProductRelated : 0;
  const ExitBounceDiff = ExitRates - BounceRates;

  return {
    TotalPages,
    TotalDuration,
    ProductFocusRatio: Number(ProductFocusRatio.toFixed(6)),
    ProductTimeRatio: Number(ProductTimeRatio.toFixed(6)),
    ExitBounceDiff: Number(ExitBounceDiff.toFixed(6)),
  };
}
