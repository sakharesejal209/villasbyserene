import { BlockedRangeDTO } from ".";

export default interface UnitCalendarDTO {
  unit_id:   string;
  unit_type: string;
  title:     string;
  blocked:   BlockedRangeDTO[];
}
