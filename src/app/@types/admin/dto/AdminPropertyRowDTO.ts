import { BookingType } from "../../property";

export default interface AdminPropertyRowDTO {
  property_id:  string;
  name:         string;
  area:         string;
  city:         string;
  state:        string;
  booking_type: BookingType;
  unit_count:   number;
  banner_url:   string | null;
  created_at:   string;
}