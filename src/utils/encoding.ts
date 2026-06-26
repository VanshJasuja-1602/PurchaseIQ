import type { EncodedMonth, EncodedVisitorType } from '../types/prediction';

/**
 * Encodes the selected month into a one-hot representation using 0 and 1.
 * Supported Months: Aug, Dec, Feb, Jul, June, Mar, May, Nov, Oct, Sep
 */
export function encodeMonth(month: string): EncodedMonth {
  return {
    Month_Aug: month === 'Aug' ? 1 : 0,
    Month_Dec: month === 'Dec' ? 1 : 0,
    Month_Feb: month === 'Feb' ? 1 : 0,
    Month_Jul: month === 'Jul' ? 1 : 0,
    Month_June: month === 'June' ? 1 : 0,
    Month_Mar: month === 'Mar' ? 1 : 0,
    Month_May: month === 'May' ? 1 : 0,
    Month_Nov: month === 'Nov' ? 1 : 0,
    Month_Oct: month === 'Oct' ? 1 : 0,
    Month_Sep: month === 'Sep' ? 1 : 0,
  };
}

/**
 * Encodes the selected visitor type into a one-hot representation using 0 and 1.
 * Supported Visitor Types: New_Visitor, Other, Returning_Visitor
 */
export function encodeVisitorType(type: string): EncodedVisitorType {
  return {
    VisitorType_New_Visitor: type === 'New_Visitor' ? 1 : 0,
    VisitorType_Other: type === 'Other' ? 1 : 0,
    VisitorType_Returning_Visitor: type === 'Returning_Visitor' ? 1 : 0,
  };
}
