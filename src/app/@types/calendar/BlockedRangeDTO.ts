export default interface BlockedRangeDTO {
  id?:    string;   // only for manual blocks — used for deletion
  start:  string;
  end:    string;
  type:   'booking' | 'manual' | 'external';
  source: string;
  label?: string;
}
