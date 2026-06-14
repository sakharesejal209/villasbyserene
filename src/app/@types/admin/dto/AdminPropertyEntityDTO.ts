export default interface AdminPropertyEntityDTO {
  property_id:       string;
  name:              string;
  description:       string;
  map_location:      string | null;
  address:           string;
  area:              string;
  city:              string;
  state:             string;
  country:           string;
  accommodationType: string;
  checkin_time:      string;
  checkout_time:     string;
  maxcapacity:       number;
  bedroomcount:      number;
  mealsAvailable:    boolean;
  bookingType:       string;
  google_maps_url:   string | null;
  created_at:        string;
}