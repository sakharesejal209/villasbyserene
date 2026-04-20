export default interface BlockedRangeDTO {
  start: string;
  end: string;
  type: "booking" | "manual" | "external";
  source: string;
  label?: string;
  id: string;
}
