export default interface CreateBlockDTO {
  unit_id: string;
  property_id: string;
  start_date: string;
  end_date: string;
  guest_name: string | null;
  notes: string | null;
}
