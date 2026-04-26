export default interface AdminUnitPricingDTO {
  id:              string;
  unitId:          string;
  weekdayPrice:    number;
  weekendPrice:    number;
  cleaningFee:     number;
  securityDeposit: number;
  taxPercent:      number;
  minNights:       number;
  isActive:        boolean;
  createdAt:       string;
  updatedAt:       string;
}