export default interface FeedSourceDTO {
  id: string;
  unit_id: string;
  source_name: string;
  ical_url: string;
  last_synced_at: string | null;
}