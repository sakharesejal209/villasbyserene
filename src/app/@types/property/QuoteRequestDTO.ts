export default interface QuoteRequestDTO {
  unitId: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  hasPet: boolean;
}
