export default interface NightlyBreakdownDTO {
  date: string;
  type: "weekday" | "weekend" | "seasonal";
  label?: string;
  price: number;
}
