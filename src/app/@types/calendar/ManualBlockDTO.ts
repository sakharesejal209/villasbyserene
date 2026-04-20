export default interface ManualBlockDTO {
  id: string;
  start_date: string;
  end_date: string;
  guest_name: string | null;
  notes: string | null;
}
